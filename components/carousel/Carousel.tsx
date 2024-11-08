import { useEffect, useRef } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import CarouselItem from "./CarouselItem";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import MapInput from "../destination/MapInput";
import { DestinationsListType } from "@/types/global";

type CarouselProps = {
  onPress: (event: number) => void;
  destinations: DestinationsListType[];
  selectedMarker: number;
};

const Carousel = ({ onPress, destinations, selectedMarker }: CarouselProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (destinations.length > 0) {
      return scrollToIndex(selectedMarker);
    }
  }, [selectedMarker]);

  const scrollToIndex = (index: number) => {
    if (index >= 0) {
      flatListRef?.current?.scrollToIndex({ animated: true, index });
    }
  };
  const getItemLayout = (_: any, index: number) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });
  return (
    <>
      <View>
        <Animated.FlatList
          ref={flatListRef}
          data={destinations}
          getItemLayout={getItemLayout}
          renderItem={({ item, index }) => (
            <CarouselItem
              item={item}
              index={index}
              scrollX={scrollX}
              onPress={onPress}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
          pagingEnabled
          onScroll={onScrollHandler}
          ListFooterComponent={<MapInput onPress={onPress} />}
        />
      </View>
    </>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    position: "absolute",
    bottom: 40,
  },
});
