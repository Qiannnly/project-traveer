import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
type MapInputProps = {
  onPress: (event: number) => void;
};
const MapInput = ({ onPress }: MapInputProps) => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => onPress(-1)}>
        <View style={styles.uploadContainer}>
          <Entypo name="map" size={30} color="white" />
          <Text style={styles.text}>Add Destination</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default MapInput;

const styles = StyleSheet.create({
  container: {
    width: 240,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    marginTop: 20,
    marginHorizontal: 60,
    borderRadius: 10,
  },
  uploadContainer: {
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontFamily: "poppins-bold",
    fontSize: 20,
    color: "white",
  },
});
