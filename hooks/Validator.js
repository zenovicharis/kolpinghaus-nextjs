import { get } from "lodash";

// ******************************
export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "email":
      validateEmail(values.email, errors);
      break;
    case "name":
      validateName(values.name, errors);
      break;
    case "message":
      validateMessage(values.message, errors);
      break;
    default:
  }
  return errors;
};

// ******************************

// ******************************
function validatePhoneNumber(phone, errors) {
  let result = true;
  const phoneObject = parsePhoneNumber(phone);
  if (!phoneObject) {
    errors.phone = "Invalid Phonenumber";
    result = false;
  }
  return result;
}
// ******************************
function validateEmail(email, errors) {
  let result = true;

  if (!email) {
    errors.email = "Email is Required";
    result = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "Invalid Email address";
  }
  return result;
}
// ******************************
function validateName(name, errors) {
  let result = true;

  if (!name) {
    errors.name = "Name is Required";
    result = false;
  } else {
    if (name.length < 2) {
      errors.name = "Name must be longer then 2 letters";
      result = false;
    }
  }

  return result;
}

function validateMessage(message, errors) {
  let result = true;

  if (!message) {
    errors.message = "Message is Required";
    result = false;
  } else {
    if (message.length < 2) {
      errors.message = "Message must be longer then 2 letters";
      result = false;
    }
  }

  return result;
}
