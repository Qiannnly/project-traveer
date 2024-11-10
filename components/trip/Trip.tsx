import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { TripListTypes } from "@/types/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const Trip = ({
  trip,
  reloadTrips,
}: {
  trip: TripListTypes;
  reloadTrips: () => void;
}) => {
  const tripId = trip.id;

  const tripTitle = trip.name;

  const startDate = trip.startDate.slice(0, 10);
  const endDate = trip.endDate.slice(0, 10);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.EXPO_PUBLIC_BACKEND_URL}/trips/${id}`);
      reloadTrips();
      router.push({
        pathname: "/(tabs)/home",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlert = (id: string) =>
    Alert.alert("Remove Trip", "Are you sure you want to remove trip?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: () => handleDelete(id),
      },
    ]);

  return (
    <TouchableOpacity
      style={styles.tripsContainer}
      accessibilityLabel="Delete Trip"
      accessibilityRole="button"
      onPress={() =>
        router.push({
          pathname: "/destination",
          params: { tripId, tripTitle },
        })
      }
    >
      <Image source={{ uri: trip.photoUrl }} style={styles.image} />
      <TouchableOpacity
        onPress={() => handleAlert(tripId)}
        style={styles.ellipsis}
      >
        <Ionicons name="ellipsis-horizontal-sharp" size={24} color="black" />
      </TouchableOpacity>
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

  ellipsis: {
    position: "absolute",

    alignSelf: "flex-end",
    right: 30,

    top: 10,
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
