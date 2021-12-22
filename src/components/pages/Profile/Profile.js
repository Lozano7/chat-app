import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../../../firebase/firebase-config';
import Camera from '../../svg/Camara';
import Delete from '../../svg/Delete';
import './profile.css';
const profileImage = require.context('../../../assets');

const Profile = () => {
  const [imageUpload, setImageUpload] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid))
      .then((docSnap) => {
        if (docSnap.exists) {
          setUser(docSnap.data());
          setImageUrl(docSnap.data().avatar);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (imageUpload) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${imageUpload.name}`
        );
        try {
          if (user.avatarPath) {
            setImageUrl('');
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, imageUpload);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImageUpload('');
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadImg();
    }
  }, [imageUpload]);

  const deleteImage = async () => {
    try {
      const confim = window.confirm('Delete avatar?');
      if (confim) {
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          avatar: '',
          avatarPath: '',
        });
      }
      setImageUrl('');
    } catch (error) {
      console.log(error.message);
    }
  };

  return user ? (
    <section className='profile'>
      <div className='profile_container'>
        <div className='profile_image'>
          <img
            src={imageUrl || profileImage('./men.png')}
            alt='profile_image'
          />
          <div className='overlay'>
            <label htmlFor='photo'>
              <Camera />
            </label>
            {user.avatar && <Delete onClick={deleteImage} />}
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              id='photo'
              name='photo'
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className='profile-text'>
          <h3>{user.name || 'anthony'}</h3>
          <p>{user.email || 'lozano'}</p>
          <hr />
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
