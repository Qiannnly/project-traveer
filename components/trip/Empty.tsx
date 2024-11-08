import { View, StyleSheet, Image, Text } from "react-native";
import { Button } from "@/components/button/Buttons";
import { router } from "expo-router";

type EmptyProps = {
  title: string;
};

const Empty = () => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/no-results.png")}
          style={styles.image}
        />
        <Text style={styles.text}>No trips found</Text>
      </View>
      <Button onPress={() => router.push("/(tabs)/createTrip")}>
        Create Trip
      </Button>
    </>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 60,
  },
  image: {
    resizeMode: "contain",
    width: 100,
    height: 100,
  },
  text: {
    fontFamily: "poppins-medium",
    marginTop: 20,
    marginBottom: 40,
  },
});
