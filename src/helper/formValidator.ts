import { ValidatorType } from "../hooks/useForm";

export const initialFormData = {
  displayName: "",
  email: "",
  password: "",
};

export const passwordValidator = (password: string) => {
  const charactersValidator = password.length >= 6;
  const upLetterValidator = /[A-Z]/.test(password);
  const numberValidator = /\d/.test(password);
  return charactersValidator && upLetterValidator && numberValidator;
};

export const formValidator = {
  email: [(value: string) => value.includes("@"), "El correo debe tener una @"],
  password: [
    passwordValidator,
    "La contraseña debe tener más de 6 letras, incluir una mayúscula y un número",
  ],
  displayName: [
    (value: string) => value.length >= 3,
    "El nombre es obligatorio",
  ],
} as ValidatorType<typeof initialFormData>;
