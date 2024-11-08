import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { TripListTypes } from "@/types/global";

const Trip = ({ trip }: { trip: TripListTypes }) => {
  const tripId = trip.id;

  const tripTitle = trip.name;

  const startDate = trip.startDate.slice(0, 10);
  const endDate = trip.endDate.slice(0, 10);
  return (
    <TouchableOpacity
      style={styles.tripsContainer}
      onPress={() =>
        router.push({
          pathname: "/destination",
          params: { tripId, tripTitle },
        })
      }
    >
      <Image source={{ uri: trip.photoUrl }} style={styles.image} />
      <View style={styles.tripDetails}>
        <Text style={[styles.text, styles.tripText]} numberOfLines={3}>
          {trip.name}
        </Text>

        <View style={styles.durationContainer}>
          <AntDesign name="calendar" size={20} color="white" />

          <Text style={[styles.text, styles.calendarText]}>{startDate}</Text>
          <Text style={[styles.text, styles.calendarText]}>to</Text>
          <Text style={[styles.text, styles.calendarText]}>{endDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Trip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tripContainerWithoutTrips: {
    paddingBottom: 90,
  },

  tripsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  image: {
    height: 190,
    width: 350,
    resizeMode: "stretch",
    borderRadius: 10,
    opacity: 0.9,
  },
  tripDetails: {
    position: "absolute",
    left: 30,
    gap: 80,
  },

  durationContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    fontFamily: "poppins-bold",
    color: "white",
  },
  tripText: {
    fontSize: 28,
    top: 40,
  },
  calendarText: {
    fontSize: 16,
  },
});
