import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GestureResponderEvent } from "react-native";

type FooterProps = {
  firstText: string;
  secondText: string;
  onPress: (event: GestureResponderEvent) => void;
};

type FooterFormProps = {
  onPress: () => void;
  children: React.ReactNode;
};

export const Footer = ({ firstText, secondText, onPress }: FooterProps) => {
  return (
    <>
      <View style={styles.footer}>
        <Text style={styles.text}>{firstText}</Text>
        <Pressable>
          <Text style={[styles.text, styles.loginText]} onPress={onPress}>
            {secondText}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export const FooterFormText = ({ onPress, children }: FooterFormProps) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, styles.destinationFooter]}>
          Delete {children}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    fontWeight: "500",
    fontFamily: "poppins-medium",
    fontSize: 16,
    textAlign: "center",
  },
  loginText: {
    textDecorationLine: "underline",
  },
  destinationFooter: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 64,

    textDecorationLine: "underline",
  },
});
