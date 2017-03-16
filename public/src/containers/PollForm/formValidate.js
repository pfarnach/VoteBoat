export default (form) => {
  const errors = {};

  // Title
  if (!form.title) {
    errors.title = 'Required';
  } else if (form.title.length > 200) {
    errors.title = 'Poll title must be 200 characters or less';
  }

  // Description -- optional
  if (form.description && form.description.length > 1000) {
    errors.description = 'Description must be 1000 characters or less';
  }

  // Poll choices
  if (form.choices.length < 3) {
    errors.choices = 'At least 3 poll choices are required';
  }

  // Poll type
  if (!form.pollType.value) {
    errors.pollType = 'Must select a poll type';
  }

  return errors;
};
