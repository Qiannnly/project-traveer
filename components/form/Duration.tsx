import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type DurationTypes = {
  onPress: (event: GestureResponderEvent) => void;
  startDate?: string;
  endDate?: string;
};

const Duration = ({ onPress, startDate, endDate }: DurationTypes) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text>{startDate ? startDate : "Start date"}</Text>
        </TouchableOpacity>

        <Text>to</Text>
        <TouchableOpacity onPress={onPress}>
          <Text>{endDate ? endDate : "End date"}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Duration;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 25,
    borderWidth: 1,
    borderRadius: 5,
  },
});
