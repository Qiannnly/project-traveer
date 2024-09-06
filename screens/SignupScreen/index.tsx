import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Button } from "@/components/button/Buttons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpValidationSchema } from "../../utils/ValidationSchema";
import Footer from "../../components/Footer";
import { AuthHeaderText } from "@/components/header/Header";
import {
  FormInput,
  FormPasswordInput,
  FormEmailInput,
} from "../../components/FormInput";
import { router } from "expo-router";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  hashedPassword: string;
};

const SignupScreen = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(SignUpValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      hashedPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { firstName, lastName, email, hashedPassword } = data;

    try {
      axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/register`, {
        firstName,
        lastName,
        email,
        hashedPassword,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={150} style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <AuthHeaderText text="Register" />

        <View style={styles.textInputContainer}>
          <FormInput
            placeholder="First name"
            name="firstName"
            register={register}
            errors={errors.firstName?.message}
          />

          <FormInput
            placeholder="Last name"
            name="lastName"
            register={register}
          />

          <FormEmailInput
            errors={errors.email?.message}
            placeholder="Email"
            name="email"
            register={register}
          />

          <View>
            <FormPasswordInput
              errors={errors.hashedPassword?.message}
              placeholder="Password"
              name="hashedPassword"
              register={register}
              isPasswordShown={isPasswordShown}
            />

            <TouchableOpacity
              style={styles.icon}
              onPress={() => setIsPasswordShown(!isPasswordShown)}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off-outline" size={24} color="black" />
              ) : (
                <Ionicons name="eye-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Footer
          firstText="Don't have an account?"
          secondText="Log In"
          onPress={() => router.push("/(routes)/login")}
        />
        <Button onPress={handleSubmit(onSubmit)}>Sign Up</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    flex: 1,
    paddingVertical: 70,
  },
  textInputContainer: { gap: 8 },
  text: {
    marginHorizontal: 50,
    textAlign: "right",
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 5,
  },
  input: {
    marginHorizontal: 50,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
  },
  icon: {
    position: "absolute",
    top: 15,
    right: 60,
  },
});
