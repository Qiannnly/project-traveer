import { View, StyleSheet, FlatList, Text } from "react-native";
import Trip from "./Trip";
import Empty from "./Empty";
import useLoadTrips from "@/hooks/useLoadTrips";
import SkeletonLoader from "../loader/SkeletonLoader";

const TripList = () => {
  const { trips, isLoading } = useLoadTrips();

  if (isLoading && trips.length === 0) {
    return <SkeletonLoader />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id.toString()}
        style={styles.tripContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Trip trip={item} />}
        ListEmptyComponent={<Empty />}
      />
    </View>
  );
};

export default TripList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tripContainer: {
    borderRadius: 8,
  },
});
