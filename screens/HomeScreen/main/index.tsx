import { View, StyleSheet } from "react-native";
import { WelcomeText } from "@/components/header/Header";
import CategoriesList from "@/components/category/CategoryList";
import TripHeader from "@/components/trip/TripHeader";
import TripList from "@/components/trip/TripList";
import { useAuthState } from "@/context/UserProvider";

const HomeScreen = () => {
  const { user } = useAuthState();

  return (
    <>
      <View style={styles.container}>
        <WelcomeText text={user?.firstName} />
        <CategoriesList />
        <TripHeader />
        <TripList />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
});
