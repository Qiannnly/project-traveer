import { ReactNode } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type HeaderTextProps = {
  text?: string;
};

export const AuthHeaderText = ({ text }: HeaderTextProps) => {
  return (
    <>
      <Text style={[styles.authText, styles.text]}>{text}</Text>
    </>
  );
};

export const HeaderText = ({ text }: HeaderTextProps) => {
  return (
    <>
      <Text style={[styles.text, styles.destinationHeader]}>
        {text} destination
      </Text>
    </>
  );
};

export const WelcomeText = ({ text }: HeaderTextProps) => {
  return (
    <>
      <Text style={[styles.welcomeText, styles.text]}>Welcome back,</Text>
      <Text style={styles.nameText}>{text}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  authText: {
    fontSize: 35,
    marginBottom: 24,
    marginTop: 72,
  },
  welcomeText: {
    fontSize: 20,

    marginTop: 56,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "poppins-bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "poppins-medium",
  },
  destinationHeader: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 24,
  },
});
