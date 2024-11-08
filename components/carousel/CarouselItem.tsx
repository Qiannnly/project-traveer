import { DestinationsListType } from "@/types/global";

import {
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
type SliderItemProps = {
  item: DestinationsListType;

  index: number;
  scrollX: SharedValue<number>;
  onPress: (event: number) => void;
};

const { width } = Dimensions.get("screen");

const CarouselItem = ({ item, index, scrollX, onPress }: SliderItemProps) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.7, 1, 0.7],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
        <TouchableOpacity onPress={() => onPress(index)}>
          <Image
            source={{ uri: item.photoUrl }}
            style={{
              width: 300,
              height: 150,
              borderRadius: 8,
            }}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8"]}
            style={styles.background}
          >
            <Text style={styles.text} numberOfLines={2}>
              {item.name}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: width,
    height: 180,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 800,
    fontFamily: "poppins-bold",
  },
  background: {
    position: "absolute",
    height: 150,
    width: 300,
    padding: 30,
    justifyContent: "flex-end",
  },
});
