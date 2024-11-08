import { useMemo, useRef, useCallback, useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import Map from "@/components/destination/Map";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import bottomSheetModal from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal";
import Carousel from "@/components/carousel/Carousel";
import DestinationForm from "@/components/form/DestinationForm";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { DestinationsListType } from "@/types/global";
import MapHeader from "@/components/destination/MapHeader";

const CreateDestinationScreen = () => {
  const [destinations, setDestinations] = useState<DestinationsListType[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const { tripId, tripTitle } = useLocalSearchParams();
  const [selectedMarker, setSelectedMarker] = useState(1);

  useEffect(() => {
    const fetchDestinations = async () => {
      if (tripId) {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/trips/${tripId}/destinations`
        );
        const userDestinations = data.data;
        setDestinations(userDestinations);
      }
    };
    fetchDestinations();
  }, [tripId]);

  const handlePresentModal = (index: number) => {
    bottomSheetModalRef.current?.present();

    if (index >= 0) {
      const selectedDestinationObj = destinations[index];
      const selectedDestinationId = selectedDestinationObj.id;
      setSelectedId(selectedDestinationId);
    } else {
      setSelectedId("");
    }
  };

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const bottomSheetModalRef = useRef<bottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%", "80%"], []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <MapHeader tripTitle={tripTitle} />
          <Map
            destinations={destinations}
            setSelectedMarker={setSelectedMarker}
          />
          <Carousel
            onPress={handlePresentModal}
            destinations={destinations}
            selectedMarker={selectedMarker}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
          >
            <DestinationForm
              selectedId={selectedId}
              tripId={tripId}
              tripTitle={tripTitle}
            />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default CreateDestinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { height: "100%", width: "100%" },
});
