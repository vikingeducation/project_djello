import validate from "validate.js";

export function getColorFromError(error) {
  return !!error ? "danger" : "default";
}

export function isEmpty(object) {
  return Object.keys(object).length === 0;
}

const formConstraints = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: { minimum: 12 }
  }
};

export function validateForm(formData) {
  return validate(formData, formConstraints);
}

export function validateEmail(formData) {
  console.log("formdata", formData);
  return validate(formData, { email: formConstraints["email"] });
}

export function validatePassword(formData) {
  return validate(formData, {
    password: formConstraints["password"]
  });
}
