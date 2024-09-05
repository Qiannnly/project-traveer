import { ReactNode } from "react";
import { GestureResponderEvent } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type ButtonProps = {
  children?: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};
export const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
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
