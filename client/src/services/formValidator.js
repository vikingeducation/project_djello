import validate from "validate.js";

export function getColorFromError(error) {
  return !!error ? "danger" : "default";
}

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}

const formConstraints = {
  username: {
    presence: true
  },
  password: {
    presence: true,
    length: { minimum: 8 }
  }
};

export const validateForm = formData => {
  return validate(formData, formConstraints);
};

export const validatePassword = formData => {
  return validate(formData, {
    examplePassword: formConstraints["password"]
  });
};
