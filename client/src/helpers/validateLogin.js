import validate from 'validate.js'

const formConstraints = {
  'email': {
    presence: true,
    email: true,
  },
  'password': {
    presence: true
  }
}

export function validateLogin(formData) {
  console.log('formDAta', formData)
  return validate(formData, formConstraints)
}