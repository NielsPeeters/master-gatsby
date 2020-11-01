import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValue = (e) => {
    // Check if the value a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') value = parseInt(value, 10);
    // Update the new value
    setValues({ ...values, [e.target.name]: value });
  };

  return { values, updateValue };
};

export default useForm;
