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
  }, [user]);

  const logIn = async (email: string, hashedPassword: string) => {
    try {
      await axios
        .post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/login`, {
          email,
          hashedPassword,
        })
        .then(async (res) => {
          if (res.data.status === "Ok") {
            const token = res.data.data;
            const userToken = await AsyncStorage.setItem("userToken", token);
            if (userToken !== null) {
              getData();
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");

      if (userToken !== null) {
        await axios
          .post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user`, {
            token: userToken,
          })
          .then(async (res) => {
            const userData = res.data.data;
            const token = res.data.token;
            const { id, firstName, lastName, email } = userData;

            setUser({ id, email, firstName, lastName, userToken: token });
          });
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
