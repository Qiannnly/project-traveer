import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@/types/global";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<{
  user: User | null;
  logIn: (email: string, hashedPassword: string) => void;
  logOut: () => void;
}>({
  user: null,
  logIn: () => Promise.resolve(),
  logOut: () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!user) {
      return router.replace("/(routes)/onboarding");
    } else if (user) {
      router.replace("/(tabs)/home");
    }
  }, [user, router]);

  const logIn = async (email: string, hashedPassword: string) => {
    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/login`,
        {
          email,
          hashedPassword,
        }
      );
      if (res.data.status === "Ok") {
        const token = res.data.data;
        await AsyncStorage.setItem("userToken", token);

        await getData();
        Toast.show({
          type: "success",
          text1: "Welcome back!",
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Oops, login failed. Please try again",
          visibilityTime: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        const res = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/user`,
          {
            token: userToken,
          }
        );
        const { id, firstName, lastName, email, token } = res.data.data;

        setUser({ id, email, firstName, lastName, userToken: token });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UserContext.Provider value={{ user, logIn, logOut }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
export default UserProvider;

export const useAuthState = () => {
  const value = useContext(UserContext);
  return value;
};
