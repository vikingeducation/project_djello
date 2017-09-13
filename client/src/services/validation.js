const EMAIL_REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const _emailRegexCondition = input => {
  return {
    result: EMAIL_REG.test(input),
    error: "<p>Please enter a valid email</p>"
  };
};

const _passwordLengthCondition = input => {
  return {
    result: input.length >= 10,
    error: "<p>Your password needs to be 10 or more characters</p>"
  };
};

const _validateCreator = condition => input => {
  let validateObj = condition(input);

  if (!validateObj.result) {
    return validateObj.error;
  }

  return null;
};

const _emailValidator = _validateCreator(_emailRegexCondition);
const _passwordLengthValidator = _validateCreator(_passwordLengthCondition);

export default {
  emailValidation: input => _emailValidator(input),
  passwordLengthValidation: input => _passwordLengthValidator(input)
};
