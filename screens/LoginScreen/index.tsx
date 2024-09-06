import { useState, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Button } from "@/components/button/Buttons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "@/utils/ValidationSchema";
import Footer from "@/components/Footer";
import { AuthHeaderText } from "@/components/Header";
import { FormEmailInput, FormPasswordInput } from "@/components/FormInput";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

type FormValues = {
  email: string;
  hashedPassword: string;
};

const LoginScreen = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(LoginValidationSchema),
    defaultValues: {
      email: "",
      hashedPassword: "",
    },
  });

  // const onSubmit = async (data: FormValues) => {
  //   const { email, hashedPassword } = data;

  //   try {
  //     axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/register`, {
  //       email,
  //       hashedPassword,
  //     });
  //     router.push("/(tabs)/home");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="black"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <AuthHeaderText text="Log In" />

        <View style={styles.textInputContainer}>
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
        <Pressable>
          <Text style={styles.text}>Forgot password</Text>
        </Pressable>
        <Footer
          firstText="Don't have an account?"
          secondText="Sign Up"
          onPress={() => router.push("/(routes)/register")}
        />
        <Button onPress={() => router.push("/(tabs)/home")}>Login</Button>

        {/* <Button onPress={handleSubmit(onSubmit)}>Login</Button> */}
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    flex: 1,
    paddingVertical: 70,
  },
  textInputContainer: { gap: 4 },
  text: {
    marginHorizontal: 50,
    textAlign: "right",
    marginBottom: 25,
    marginTop: 5,
    fontFamily: "poppins-medium",
  },

  icon: {
    position: "absolute",
    top: 15,
    right: 60,
  },
  backIcon: {
    position: "absolute",
    top: 30,
    left: 50,
  },
});
