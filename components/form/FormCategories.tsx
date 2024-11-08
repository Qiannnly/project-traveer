import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import useLoadCategories from "@/hooks/useLoadCategories";

type FormCategoriesProps = {
  setSelectedCategories: (value: string[]) => void;
  selectedCategories: string[];
};

const FormCategories = ({
  setSelectedCategories,
  selectedCategories,
}: FormCategoriesProps) => {
  const { tripCategories } = useLoadCategories();

  const handleOnLongPress = (title: string) => {
    if (selectedCategories.includes(title)) {
      const newSelectedItems = selectedCategories.filter(
        (value) => value !== title
      );
      return setSelectedCategories([...newSelectedItems]);
    }
    setSelectedCategories([...selectedCategories, title]);
  };

  const getSelected = (title: string) => selectedCategories.includes(title);

  return (
    <>
      <View style={styles.categoryContainer}>
        {tripCategories.map((category) => {
          const { id, name } = category;
          return (
            <TouchableOpacity
              key={id}
              onPress={() => handleOnLongPress(name)}
              style={getSelected(name) && styles.selectedList}
            >
              <Text
                style={[styles.text, getSelected(name) && styles.selectedText]}
              >
                {name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default FormCategories;

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    overflow: "hidden",
    paddingTop: 20,
    marginHorizontal: 20,
    paddingBottom: 40,

    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "black",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
  },
  selectedList: {
    borderRadius: 8,
    backgroundColor: "#A67B5B",
  },
  selectedText: { color: "white" },
});
