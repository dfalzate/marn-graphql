// custom hook useForm
import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log("This is values",values)
  };

  const onChangeGoogle = (values) => {
    setValues(values);
    console.log("This si the values",values)
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    onChangeGoogle,
    values
  };
};