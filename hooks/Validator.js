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
function validateEmail(email, errors) {
  let result = true;

  if (!email) {
    errors.email = "E-Mail ist erforderlich";
    result = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "Ungültige E-Mail-Adresse";
  }
  return result;
}
// ******************************
function validateName(name, errors) {
  let result = true;

  if (!name) {
    errors.name = "Name ist erforderlich";
    result = false;
  } else {
    if (name.length < 2) {
      errors.name = "Der Name muss länger als 2 Buchstaben sein";
      result = false;
    }
  }

  return result;
}

function validateMessage(message, errors) {
  let result = true;

  if (!message) {
    errors.message = "Nachricht ist erforderlich";
    result = false;
  } else {
    if (message.length < 2) {
      errors.message = "Die Nachricht muss länger als 2 Buchstaben sein";
      result = false;
    }
  }

  return result;
}
