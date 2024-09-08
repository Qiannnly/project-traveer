import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
        {tripCategories &&
          tripCategories.map((category: { id: string; title: string }) => {
            const { id, title } = category;
            return (
              <>
                <View key={id}>
                  <TouchableOpacity
                    onPress={() => handleOnLongPress(title)}
                    style={getSelected(title) && styles.selectedList}
                    key={id}
                  >
                    <Text
                      style={[
                        styles.text,
                        getSelected(title) && styles.selectedText,
                      ]}
                    >
                      {title}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
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
    gap: 12,
    overflow: "hidden",
    paddingTop: 5,
    marginHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "black",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 0.5,
  },
  selectedList: {
    borderRadius: 8,
    backgroundColor: "#A67B5B",
  },
  selectedText: { color: "white" },
});
