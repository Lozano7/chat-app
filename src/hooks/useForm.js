import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  const handleLoadingErrors = ({ error = null, loading = false }) => {
    setValues({
      ...values,
      error,
      loading,
    });
  };

  return [values, handleInputChange, handleLoadingErrors, reset];
};
