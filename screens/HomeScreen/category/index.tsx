import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import axios from "axios";
import { TripListTypes } from "@/types/global";
import Trip from "@/components/Trip";
import Empty from "@/components/Empty";

const TripCategoryScreen = () => {
  const [selectedTrips, setSelectedTrips] = useState<TripListTypes[]>([]);
  const navigation = useNavigation();
  const { title } = useLocalSearchParams();

  // const userId = 1;

  const getSelectedCategory = async (title: string | string[]) => {
    // const { data } = await axios.get(
    //   `${process.env.EXPO_PUBLIC_BACKEND_URL}/categories/${title}?user=${userId}`
    // );
    // setSelectedTrips(data);
    // setSelectedTrips(data)
  };

  // useEffect(() => {
  //   if (title) {
  //     getSelectedCategory(title);
  //   }
  // }, [title]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: title,
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
          renderItem={({ item, index }) => <Trip key={index} trip={item} />}
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
