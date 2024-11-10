import { useEffect } from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuthState } from "@/context/UserProvider";
import { LogoutButton, Button } from "@/components/button/Buttons";
import FormText from "@/components/form/FormText";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { FooterFormText } from "@/components/footer/Footer";
import { router } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  hashedPassword: string;
};

const ProfileScreen = () => {
  const { user, logOut } = useAuthState();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const userId = user?.id;
  const onSubmit = async (data: FormValues) => {
    const { firstName, lastName, email } = data;

    try {
      const data = await axios.put(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${userId}`,
        {
          firstName,
          lastName,
          email,
        }
      );
      const status = data.data.status;
      if (status === "Ok") {
        console.log("data updated", data.data);
        Toast.show({
          type: "success",
          text1: `Profile updated!`,
          visibilityTime: 2000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logOut();
    router.push({
      pathname: "/(routes)/login",
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${userId}`
      );
      router.push({
        pathname: "/(routes)/onboarding",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlert = () =>
    Alert.alert(
      "Remove Destination",
      "Are you sure you want to remove destination?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: handleDelete,
        },
      ]
    );

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        hashedPassword: "********",
      });
    }
  }, [user]);

  return (
    <>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.contactsContainer}>
          <Text style={styles.profileText}>Profile</Text>

          <FormText>First Name</FormText>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                defaultValue={user?.firstName}
                onChangeText={onChange}
                value={value}
                style={[styles.input, styles.normalInput]}
              />
            )}
          />

          <FormText>Last Name</FormText>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                defaultValue={user?.lastName}
                onChangeText={onChange}
                value={value}
                style={[styles.input, styles.normalInput]}
              />
            )}
          />
          <FormText>Email</FormText>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={[styles.input, styles.normalInput]}
              />
            )}
          />
          <FormText>Password</FormText>
          <Controller
            name="hashedPassword"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                style={[styles.input, styles.normalInput]}
              />
            )}
          />
        </View>
        <Button onPress={handleSubmit(onSubmit)}>Update Profile</Button>
        {user ? (
          <FooterFormText onPress={handleAlert}>profile</FooterFormText>
        ) : null}
      </GestureHandlerRootView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    zIndex: 90,
    top: 54,
    right: 60,
  },
  profileText: {
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "poppins-bold",
    marginBottom: 24,
  },

  contactsContainer: {
    paddingTop: 96,
    paddingHorizontal: 15,
    marginBottom: 28,
  },
  updateContainer: {
    paddingHorizontal: 40,
  },
  footerLabel: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  input: {
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
  },
  normalInput: {
    height: 50,
  },
});
