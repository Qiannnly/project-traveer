import { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { TripListTypes } from "@/types/global";
import Trip from "@/components/trip/Trip";
import Empty from "@/components/trip/Empty";
import { useAuthState } from "@/context/UserProvider";
import useLoadTrips from "@/hooks/useLoadTrips";

const TripCategoryScreen = () => {
  const [selectedTrips, setSelectedTrips] = useState<TripListTypes[]>([]);
  const { reloadTrips } = useLoadTrips();
  const { user } = useAuthState();
  const navigation = useNavigation();

  const { title } = useLocalSearchParams();

  const userId = user?.id;

  useEffect(() => {
    if (userId && title) {
      getSelectedCategory(userId, title);
    } else if (userId && !title) {
      getAllCategories(userId);
    }
  }, [title, userId]);

  const getSelectedCategory = async (
    userId: string,
    title: string | string[]
  ) => {
    const { data } = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${userId}/trips/search?q=${title}`
    );
    setSelectedTrips(data);
  };

  const getAllCategories = async (userId: string) => {
    try {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${userId}/trips`
      );
      const trips = data.data;
      setSelectedTrips(trips);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: title ? title : "All Trips",
      headerBackTitle: "Home",
    });
  }, [title]);
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={selectedTrips}
          keyExtractor={(item) => item.id}
          style={styles.tripContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Trip trip={item} reloadTrips={reloadTrips} />
          )}
          ListEmptyComponent={() => <Empty />}
        />
      </View>
    </>
  );
};

export default TripCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  tripContainer: {
    borderRadius: 10,
  },

  // extra
  tripsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    gap: 10,
    shadowColor: "#333333",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
