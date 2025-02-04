import { useEffect, useMemo, useState } from "react";

type targetType = { name: string; value: string };
type validatorContentType = [() => boolean, string];
type validatorType = Record<string, Array<validatorContentType> | null>;

export const useForm = (
  initialForm = {} as Record<string, string>,
  validator = {} as validatorType
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidator, setFormValidator] = useState(validator);

  useEffect(() => {
    createValidator();
  }, [formState]);

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
    const formCheckedValues = {} as validatorType;
    for (const formField of Object.keys(validator)) {
      const [fn, errorMessage] = validator[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidator(formCheckedValues);

    console.log(formCheckedValues);
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
