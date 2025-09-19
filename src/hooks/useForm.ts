import { useEffect, useMemo, useState } from "react";

export type targetType = { name: string; value: string };
export type validatorType = Record<
  string,
  [(value: string) => boolean, string]
>;

export const useForm = (
  initialForm = {} as Record<string, string | number>,
  validator = {} as validatorType
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidator, setFormValidator] = useState(validator);

  useEffect(() => {
    createValidator();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidator)) {
      if (formValidator[formValue] !== null) return false;
    }
    return true;
  }, [formValidator]);

  const onInputChange = ({ target }: { target: targetType }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidator = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(validator)) {
      const [fn, errorMessage] = validator[formField];
      //prettier-ignore
      formCheckedValues[`${formField}Valid`] = fn(String(formState[formField]))
        ? null
        : errorMessage;
    }
    setFormValidator(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidator,
    isFormValid,
  };
};
