export default (form) => {
  const errors = {};

  //  Email
  if (!form.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
    errors.email = 'Invalid email address';
  }

  // Password
  if (!form.password) {
    errors.password = 'Required';
  } else if (form.password.length < 6 || form.password.length > 100) {
    errors.password = 'Must be at least 6 characters';
  }

  return errors;
};
