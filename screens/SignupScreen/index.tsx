import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import { router } from "expo-router";

import axios from "axios";
import { AuthHeaderText } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/button/Buttons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpValidationSchema } from "../../utils/ValidationSchema";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  hashedPassword: string;
};

const SignupScreen = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const {
    control,
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
      const data = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/register`,
        {
          firstName,
          lastName,
          email,
          hashedPassword,
        }
      );
      Toast.show({
        type: "success",
        text1: "Registered successfully!",
        visibilityTime: 2000,
      });
      setTimeout(() => {
        return router.push("/(routes)/login");
      }, 2500);
      const status = data.data.status;
      if (status === "400") {
        Toast.show({
          type: "error",
          text1: "Oops, email is already registered",
          visibilityTime: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={150} style={styles.container}>
      <GestureHandlerRootView style={styles.formContainer}>
        <AuthHeaderText text="Register" />

        <View style={styles.textInputContainer}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="First name"
                placeholderTextColor="grey"
                onChangeText={onChange}
                value={value}
                style={[styles.input, styles.normalInput]}
              />
            )}
          />
          {
            <Text style={styles.errorText}>
              {errors.firstName && errors.firstName.message}
            </Text>
          }

          <View>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Last name"
                  placeholderTextColor="grey"
                  onChangeText={onChange}
                  value={value}
                  style={[styles.input, styles.normalInput]}
                />
              )}
            />
            {
              <Text style={styles.errorText}>
                {errors.lastName && errors.lastName.message}
              </Text>
            }
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="grey"
                  onChangeText={onChange}
                  value={value}
                  style={[styles.input, styles.normalInput]}
                />
              )}
            />
            {
              <Text style={styles.errorText}>
                {errors.email && errors.email.message}
              </Text>
            }
            <View>
              <Controller
                name="hashedPassword"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="grey"
                    onChangeText={onChange}
                    value={value}
                    style={[styles.input, styles.normalInput]}
                    secureTextEntry={isPasswordShown}
                  />
                )}
              />
              {
                <Text style={styles.errorText}>
                  {errors.hashedPassword && errors.hashedPassword.message}
                </Text>
              }
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
        </View>

        <Footer
          firstText="Don't have an account?"
          secondText="Log In"
          onPress={() => router.push("/(routes)/login")}
        />
        <Button onPress={handleSubmit(onSubmit)}>Sign Up</Button>
      </GestureHandlerRootView>
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

  icon: {
    position: "absolute",
    top: 15,
    right: 60,
  },
  input: {
    marginHorizontal: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
  },
  normalInput: {
    height: 50,
  },

  errorText: {
    marginBottom: 4,
    color: "red",
    marginHorizontal: 50,
  },
});
