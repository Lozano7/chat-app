const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

export default function validarForm({
  name,
  email,
  password,
  passwordConfirm,
}) {
  if (name) {
    if (!name || !email || !password || !passwordConfirm) {
      return {
        value: false,
        error: 'All fields are required',
      };
    }
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      return {
        value: false,
        error: 'Email or password not valid',
      };
    }
    if (password !== passwordConfirm) {
      return {
        value: false,
        error: 'Passwords do not match',
      };
    }
  } else {
    if (!email || !password) {
      return {
        value: false,
        error: 'All fields are required',
      };
    }
    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      return {
        value: false,
        error: 'Email or password not valid',
      };
    }
  }
  return {
    value: true,
    error: null,
  };
}
