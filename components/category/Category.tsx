import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { CategoryTypes } from "@/types/global";
import { router } from "expo-router";

const Category = ({ category }: { category: CategoryTypes }) => {
  const handleSelectedCategory = async (title: string) => {
    router.push({ pathname: "/tripCategory", params: { title } });
  };

  const staticImages = {
    "adventure.png": require("../../assets/images/adventure.png"),
    "budget.png": require("../../assets/images/budget.png"),
    "home.png": require("../../assets/images/home.png"),
    "caravan.png": require("../../assets/images/caravan.png"),
    "relax.png": require("../../assets/images/relax.png"),
    "couple.png": require("../../assets/images/couple.png"),
  };

  const getImage = (photoUrl: keyof typeof staticImages) => {
    return staticImages[photoUrl];
  };

  return (
    <>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleSelectedCategory(category.name)}
      >
        <Image source={getImage(category.photoUrl)} style={styles.image} />

        <Text>{category.name}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 18,
    marginHorizontal: 26,
    marginTop: 30,
    fontFamily: "poppins-bold",
  },

  imageContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    gap: 10,
  },
  image: {
    width: 50,
    height: 40,
  },
});
