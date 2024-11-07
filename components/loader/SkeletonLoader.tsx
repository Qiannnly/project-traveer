import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const colors = ["#e0e0e0", "#c0c0c0", "#e0e0e0"];
const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LinearGradient colors={colors} style={styles.linearGradient} />
      </View>
      <View style={styles.textContainer}>
        <LinearGradient colors={colors} style={styles.linearGradientText} />
        <LinearGradient
          colors={colors}
          style={[styles.linearGradientText, styles.longText]}
        />
      </View>
    </View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  linearGradient: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },

  textContainer: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    gap: 60,
  },
  linearGradientText: {
    height: 20,

    width: "30%",
  },
  longText: {
    width: "80%",
  },
});
