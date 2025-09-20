import { useEffect, useMemo, useState } from "react";

type ValidatorFn<T> = (value: T[keyof T]) => boolean;

type targetType = { name: string; value: string };

export type ValidatorType<T> = {
  [K in keyof T]?: [ValidatorFn<T>, string];
};

export type ValidatorResult<T> = {
  [K in keyof T as `${string & K}Valid`]: string | null;
};

export const useForm = <T extends Record<string, string | number>>(
  initialForm: T,
  validator: ValidatorType<T> = {}
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidator, setFormValidator] =
    useState<ValidatorResult<T>>(validator);

  useEffect(() => {
    createValidator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    return Object.values(formValidator).every((val) => val === null);
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
    const formCheckedValues = {} as ValidatorResult<T>;
    for (const formField in validator) {
      const [fn, errorMessage] = validator[formField]!;
      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
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
