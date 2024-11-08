import { DestinationsListType } from "@/types/global";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInputComponent,
  View,
} from "react-native";

import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";

type MapSearchProps = {
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat?: number; lng?: number }>
  >;
  formattedAddress: string;
};

const MapSearch = ({ setLocation, formattedAddress }: MapSearchProps) => {
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    if (formattedAddress && ref.current !== null) {
      ref.current.setAddressText(formattedAddress);
    }
  }, [formattedAddress]);

  return (
    <GooglePlacesAutocomplete
      placeholder="Search location"
      fetchDetails={true}
      onFail={(error) => console.log(error)}
      onPress={(data, details = null) => {
        const searchedLocation = details?.geometry.location;
        setLocation({
          lat: searchedLocation?.lat,
          lng: searchedLocation?.lng,
        });
      }}
      ref={ref}
      listViewDisplayed={false}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_API_API_KEY,
        language: "en",
      }}
      enablePoweredByContainer={false}
      styles={{
        container: styles.container,
        listView: styles.listView,
        textInput: styles.textInput,
      }}
      debounce={500}
      disableScroll={true}
      enableHighAccuracyLocation={true}
    />
  );
};

export default MapSearch;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 50,
  },
  listView: {
    maxHeight: 175,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 90,
  },

  textInput: {
    paddingLeft: 10,
    color: "#5d5d5d",
    fontSize: 16,
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
  },
});
