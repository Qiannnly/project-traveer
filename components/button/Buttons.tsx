import { ReactNode } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.8;

type ButtonProps = {
  children?: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};

type LogoutButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
};

export const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.button, { width: buttonWidth }]}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#A67B5B",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    fontFamily: "poppins-medium",
  },
});
