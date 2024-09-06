import { View, Text, ImageBackground, StyleSheet } from "react-native";
import caravanBackgroundImage from "../../assets/images/caravan.jpg";
import { Button } from "@/components/button/Buttons";
import Footer from "@/components/Footer";
import { useRouter } from "expo-router";

const OnboardingScreen = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={caravanBackgroundImage}
          resizeMode="cover"
          style={styles.container}
        >
          <View style={[styles.container, styles.primaryContainer]}>
            <Text style={styles.text} numberOfLines={2}>
              Travel Keepsakes
            </Text>

            <View style={styles.secondaryContainer}>
              <Button
                onPress={() => {
                  router.push("/(routes)/register");
                }}
              >
                Get Started
              </Button>
              <Footer
                firstText="Already a user?"
                secondText="Log In"
                onPress={() => router.push("/(routes)/login")}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};
export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  primaryContainer: {
    justifyContent: "center",
    marginBottom: 64,
    gap: 80,
  },
  text: {
    color: "black",
    paddingHorizontal: 40,
    fontFamily: "poppins-medium",
    fontSize: 45,
    textAlign: "center",
  },
  secondaryContainer: {
    gap: 12,
  },
});
