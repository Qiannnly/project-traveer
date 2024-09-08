import { TextInput, Text, StyleSheet } from "react-native";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

type FormInputProps<TFormValues extends FieldValues> = {
  errors?: string;
  placeholder: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  isPasswordShown?: boolean;
};
export const FormInput = <TFormValues extends Record<string, unknown>>({
  errors,
  placeholder,
  name,
  register,
}: FormInputProps<TFormValues>) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        {...register(name, { required: true })}
        placeholderTextColor="#696969"
        style={styles.input}
        keyboardType="default"
      />

      {<Text style={styles.errorText}>{errors}</Text>}
    </>
  );
};

export const FormMultilineInput = <
  TFormValues extends Record<string, unknown>
>({
  errors,
  placeholder,
  name,
  register,
}: FormInputProps<TFormValues>) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        {...register(name, { required: true })}
        placeholderTextColor="#696969"
        style={styles.multilineInput}
        keyboardType="default"
        multiline
      />

      {<Text style={styles.errorText}>{errors}</Text>}
    </>
  );
};

export const FormEmailInput = <TFormValues extends Record<string, unknown>>({
  errors,
  placeholder,
  name,
  register,
}: FormInputProps<TFormValues>) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        {...register(name, { required: true })}
        placeholderTextColor="#696969"
        style={styles.input}
        keyboardType="email-address"
      />

      {<Text style={styles.errorText}>{errors}</Text>}
    </>
  );
};

export const FormPasswordInput = <TFormValues extends Record<string, unknown>>({
  errors,
  placeholder,
  name,
  register,
  isPasswordShown,
}: FormInputProps<TFormValues>) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        {...register(name, { required: true })}
        placeholderTextColor="#696969"
        style={styles.input}
        keyboardType="default"
        secureTextEntry={isPasswordShown}
      />

      {<Text style={styles.errorText}>{errors}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 50,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    marginBottom: 5,
  },
  multilineInput: {
    marginHorizontal: 50,
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
    paddingLeft: 10,
    paddingTop: 15,
    marginBottom: 5,
  },

  errorText: {
    color: "red",
    marginHorizontal: 50,
  },
});
