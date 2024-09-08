import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { CategoryTypes } from "@/types/global";
import { router } from "expo-router";

const Category = ({ category }: { category: CategoryTypes }) => {
  const handleSelectedCategory = async (title: string) => {
    router.push({ pathname: "/tripCategory", params: { title } });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleSelectedCategory(category.title)}
      >
        <Image source={category.icon} style={styles.image} />
        <Text>{category.title}</Text>
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
    borderWidth: 0.4,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    gap: 10,
  },
  image: {
    width: 50,
    height: 40,
  },
});
