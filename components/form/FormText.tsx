import { Text, StyleSheet } from "react-native";

type FormTextProps = {
  children: React.ReactNode;
};

const FormText = ({ children }: FormTextProps) => {
  return (
    <>
      <Text style={styles.text}>{children}</Text>
    </>
  );
};

export default FormText;

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 50,
    marginBottom: 2,
    marginTop: 5,
    fontFamily: "poppins-medium",
  },
});
