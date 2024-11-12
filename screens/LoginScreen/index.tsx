import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthHeaderText } from "@/components/header/Header";
import { Button } from "@/components/button/Buttons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidationSchema } from "@/utils/ValidationSchema";
import { Footer } from "@/components/footer/Footer";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useAuthState } from "@/context/UserProvider";

type FormValues = {
  email: string;
  hashedPassword: string;
};

const LoginScreen = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { logIn } = useAuthState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(LoginValidationSchema),
    defaultValues: {
      email: "",
      hashedPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const { email, hashedPassword } = data;
    try {
      logIn(email, hashedPassword);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.formContainer}>
        <TouchableOpacity onPress={() => router.push("/(routes)/onboarding")}>
          <Entypo
            name="cross"
            size={36}
            color="black"
            style={styles.cancelIcon}
          />
        </TouchableOpacity>
        <AuthHeaderText text="Log In" />

        <View style={styles.textInputContainer}>
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
        <Pressable>
          <Text style={styles.text}>Forgot password</Text>
        </Pressable>
        <Footer
          firstText="Don't have an account?"
          secondText="Sign Up"
          onPress={() => router.push("/(routes)/register")}
        />

        <Button onPress={handleSubmit(onSubmit)}>Login</Button>
      </GestureHandlerRootView>
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
  textInputContainer: { gap: 8 },
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
  cancelIcon: {
    position: "absolute",
    top: 8,
    left: 50,
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
    color: "red",
    marginHorizontal: 50,
  },
});
