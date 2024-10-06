import { View, Text, Pressable, StyleSheet } from "react-native";
import { GestureResponderEvent } from "react-native";

type FooterProps = {
  firstText: string;
  secondText: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Footer = ({ firstText, secondText, onPress }: FooterProps) => {
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

export default Footer;

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
  },
  loginText: {
    textDecorationLine: "underline",
  },
});
