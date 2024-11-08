import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type MapHeaderProps = {
  tripTitle: string | string[];
};

const MapHeader = ({ tripTitle }: MapHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/home")}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back-circle-sharp" size={36} color="white" />
      </TouchableOpacity>

      <View>
        <Text style={styles.text} numberOfLines={3}>
          {tripTitle}
        </Text>
      </View>
    </View>
  );
};

export default MapHeader;

const styles = StyleSheet.create({
  header: {
    position: "absolute",

    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },

  backButton: {
    position: "absolute",
    left: "5%",
  },

  text: {
    fontSize: 24,
    marginLeft: 5,
    textAlign: "center",

    fontFamily: "poppins-bold",
    color: "white",
  },
});
