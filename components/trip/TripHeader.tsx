import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
const TripHeader = () => {
  const userId = 1;
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.tripText}> Trips</Text>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/tripCategory",
              params: { userId: userId },
            })
          }
        >
          <Text style={styles.text}>See all</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TripHeader;

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 18,
    paddingTop: 14,
    justifyContent: "space-between",
    flexDirection: "row",

    alignItems: "center",
  },

  tripText: {
    fontFamily: "poppins-bold",
    fontSize: 24,
  },
  text: {
    color: "#800080",
    fontSize: 20,
  },
});
