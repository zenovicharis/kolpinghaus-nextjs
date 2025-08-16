interface ValidationErrors {
  email?: string;
  name?: string;
  message?: string;
  subject?: string;
}

interface FormValues {
  email?: string;
  name?: string;
  message?: string;
  subject?: string;
}

export const validator = (
  values: FormValues,
  fieldName: string,
): ValidationErrors => {
  const errors: ValidationErrors = {};
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
    case "subject":
      validateSubject(values.subject, errors);
      break;
    default:
  }
  return errors;
};

function validateEmail(email: string | undefined, errors: ValidationErrors) {
  let result = true;

  if (!email) {
    errors.email = "E-Mail ist erforderlich";
    result = false;
  } else {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "Ungültige E-Mail-Adresse";
  }
  return result;
}

function validateName(name: string | undefined, errors: ValidationErrors) {
  let result = true;

  if (!name) {
    errors.name = "Name ist erforderlich";
    result = false;
  }

  else {
    if (name.length < 2) {
      errors.name = "Der Name muss länger als 2 Buchstaben sein";
      result = false;
    }
  }

  return result;
}

function validateMessage(
  message: string | undefined,
  errors: ValidationErrors,
) {
  let result = true;

  if (!message) {
    errors.message = "Nachricht ist erforderlich";
    result = false;
  }

  else {
    if (message.length < 2) {
      errors.message = "Die Nachricht muss länger als 2 Buchstaben sein";
      result = false;
    }
  }

  return result;
}

function validateSubject(
  subject: string | undefined,
  errors: ValidationErrors,
) {
  let result = true;

  if (!subject) {
    errors.subject = "Betreff ist erforderlich";
    result = false;
  }

  else {
    if (subject.length < 2) {
      errors.subject = "Der Betreff muss länger als 2 Buchstaben sein";
      result = false;
    }
  }

  return result;
}
