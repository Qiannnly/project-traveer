import { useContext, useEffect, useState } from "react";

import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker, Callout, LatLng } from "react-native-maps";
import { DestinationsListType } from "@/types/global";
import { UserLocationContext } from "@/context/UserLocationContext";

type MapProps = {
  destinations: DestinationsListType[];
  setSelectedMarker: (event: number) => void;
};
const Map = ({ destinations, setSelectedMarker }: MapProps) => {
  const userLocation = useContext(UserLocationContext);

  const [mapRegion, setMapRegion] = useState({
    latitude: userLocation?.userLocation?.lat ?? 0,
    longitude: userLocation?.userLocation?.lng ?? 0,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (destinations.length > 0) {
      setMapRegion({
        latitude: destinations[0].lat,
        longitude: destinations[0].lng,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      });
    }
  }, [destinations]);

  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      region={mapRegion}
      onRegionChangeComplete={(mapRegion) => setMapRegion(mapRegion)}
    >
      {destinations &&
        destinations.map((destination, index) => {
          const lat = destination.lat;
          const lng = destination.lng;
          const latlng: LatLng = { latitude: lat, longitude: lng };
          return (
            <Marker
              draggable
              coordinate={latlng}
              key={index}
              onPress={() => setSelectedMarker(index)}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{destination.name}</Text>
                  <Text style={styles.calloutDescription}>
                    {destination.description}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { height: "100%", width: "100%" },

  calloutContainer: {
    width: 180,
    height: 90,
    paddingVertical: 20,

    justifyContent: "space-between",
  },

  calloutTitle: {
    fontSize: 20,
    fontFamily: "poppins-bold",
  },
  calloutDescription: {
    fontSize: 15,
    paddingBottom: 10,
  },
});
