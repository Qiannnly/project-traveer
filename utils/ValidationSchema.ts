import * as yup from "yup";

const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  hashedPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should contain at least 8 characters"),
});

const SignUpValidationSchema = yup.object().shape({
  firstName: yup.string().required("Field is required"),
  lastName: yup.string(),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  hashedPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should contain at least 8 characters"),
});

const TripValidationSchema = yup.object().shape({
  name: yup.string().required("Field is required"),
  description: yup.string().required("Field is required"),
});

const DestinationValidationSchema = yup.object().shape({
  name: yup.string().required("Field is required"),
  description: yup.string().required("Field is required"),
});

export {
  LoginValidationSchema,
  SignUpValidationSchema,
  TripValidationSchema,
  DestinationValidationSchema,
};
