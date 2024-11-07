import { View, Text, ImageBackground, StyleSheet } from "react-native";
import compass from "../../assets/images/compass.png";
import { Button } from "@/components/button/Buttons";
import { Footer } from "@/components/footer/Footer";
import { useRouter } from "expo-router";

const OnboardingScreen = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={compass}
          resizeMode="cover"
          style={styles.container}
        >
          <View style={[styles.container, styles.primaryContainer]}>
            <Text style={styles.text}>TRAVEER</Text>

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
    justifyContent: "space-around",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 52,
    textAlign: "center",
    marginBottom: 80,
  },
  secondaryContainer: {
    gap: 12,
  },
});
