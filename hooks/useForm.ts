import { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from "react";

interface UseFormProps<T> {
  initState: T;
  callback: () => void;
  validator: (state: T, fieldName: keyof T) => Partial<Record<keyof T, string>>;
}

const useForm = <T extends Record<string, any>>({
  initState,
  callback,
  validator,
}: UseFormProps<T>) => {
  const [state, setState] = useState<T>(initState);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => !!error);
    if (isSubmited && !hasErrors) {
      callback();
    }
  }, [errors, isSubmited, callback]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: fieldName } = e.target as { name: keyof T };
    const failedFields = validator(state, fieldName);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: failedFields[fieldName],
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const failedFields = validator(state, "" as keyof T); // Validate all fields on submit
    setErrors(failedFields);
    setIsSubmited(true);
  };

  const resetForm = () => {
    setState(initState);
    setErrors({});
    setIsSubmited(false);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
    state,
    errors,
  };
};

export default useForm;
