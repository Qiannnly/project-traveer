import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import Category from "./Category";
import useLoadCategories from "@/hooks/useLoadCategories";

const CategoriesList = () => {
  const { tripCategories } = useLoadCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <>
      <View>
        <Text style={styles.categoryTitle}>Categories</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tripCategories}
          style={styles.categoryContainer}
          renderItem={({ item, index }) => (
            <Category
              key={index}
              category={item}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          )}
        />
      </View>
    </>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 18,
    marginHorizontal: 26,
    marginTop: 30,
    fontFamily: "poppins-bold",
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 25,
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
    width: 40,
    height: 40,
  },
});
