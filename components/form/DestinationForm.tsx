import { useState, useEffect } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { Button } from "../button/Buttons";
import { FormValues } from "@/types/global";
import FormText from "./FormText";
import { yupResolver } from "@hookform/resolvers/yup";
import { TripValidationSchema } from "@/utils/ValidationSchema";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
("react-native-google-places-autocomplete");
import * as ImagePicker from "expo-image-picker";
import MapSearch from "../destination/MapSearch";
import { router, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { HeaderText } from "../header/Header";
import { FooterFormText } from "../footer/Footer";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import axios from "axios";
import Geocoder from "react-native-geocoding";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

export type GooglePlacesAutocompleteRef = {
  setAddressText(address: string): void;
  getAddressText(): string;
  getCurrentLocation(): void;
} & TextInput;

type DestinationFormProps = {
  selectedId: string;
  tripId: string | string[];
  tripTitle: string | string[];
};

const DestinationForm = ({
  selectedId,
  tripId,
  tripTitle,
}: DestinationFormProps) => {
  const [location, setLocation] = useState<{ lat?: number; lng?: number }>({
    lat: 0,
    lng: 0,
  });

  const [selectedDestination, setSelectedDestination] = useState({
    name: "",
    description: "",
    photoUrl: "",
    lat: "",
    lng: "",
  });
  const [formattedAddress, setFormattedAddress] = useState("");

  const [image, setImage] = useState("");

  useEffect(() => {
    if (selectedId !== "") {
      fetchSelectedDestination(selectedId);
    }
  }, [selectedId]);

  const fetchSelectedDestination = async (selectedDestinationId: string) => {
    const { data } = await axios.get(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/destinations/${selectedDestinationId}`
    );

    setSelectedDestination({
      name: data.name,
      description: data.description,
      photoUrl: data.photoUrl,
      lat: data.lat,
      lng: data.lng,
    });
    setLocation({ lat: data.lat, lng: data.lng });

    getFormattedAddress(data.lat, data.lng);
  };

  useEffect(() => {
    if (selectedDestination.photoUrl) {
      setImage(selectedDestination.photoUrl);
    }
  }, [selectedDestination.photoUrl]);

  Geocoder.init(`${process.env.EXPO_PUBLIC_GOOGLE_API_API_KEY}`);

  const getFormattedAddress = (lat: number, lng: number) => {
    Geocoder.from(lat, lng).then((res) => {
      const destinationAddress = res.results[0].formatted_address;

      setFormattedAddress(destinationAddress);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateDestination = async (formData: FormValues, url: string) => {
    const { name, description } = formData;

    await axios.put(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/destinations/${selectedId}`,
      {
        name: name,
        description: description,
        lat: location.lat,
        lng: location.lng,
        photoUrl: url,
      }
    );
    Toast.show({
      type: "success",
      text1: `Destination updated!`,
      visibilityTime: 2000,
    });

    router.push({
      pathname: "/destination",
      params: { tripId, tripTitle },
    });
  };

  const onSubmit = async (formData: FormValues) => {
    const response = await fetch(image);

    const blob = await response.blob();

    const storageRef = ref(storage, "destinationPhoto/" + uuidv4() + ".jpg");

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log(snapshot);
      })
      .then((response) => {
        getDownloadURL(storageRef).then((url) => {
          if (selectedId === "") {
            createDestination(formData, url);
          } else if (selectedId !== "") {
            updateDestination(formData, url);
          }
        });
      });
  };

  const createDestination = async (formData: FormValues, url: string) => {
    const { name, description } = formData;

    await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/destinations`, {
      name,
      description,
      lat: location.lat,
      lng: location.lng,
      photoUrl: url,
      tripId: tripId,
    });

    router.push({
      pathname: "/destination",
      params: { tripId, tripTitle },
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/destinations/${selectedId}`
      );
      router.push({
        pathname: "/destination",
        params: { tripId, tripTitle },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlert = () =>
    Alert.alert(
      "Remove Destination",
      "Are you sure you want to remove destination?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: handleDelete,
        },
      ]
    );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(TripValidationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (selectedDestination) {
      reset({
        name: selectedDestination.name,
        description: selectedDestination.description,
      });
    }
  }, [selectedDestination]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.containerStyle}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <HeaderText text={selectedId ? "Update" : "Add"} />
          <View>
            <FormText>Name</FormText>

            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  placeholder="Destination name"
                  placeholderTextColor="grey"
                  onChangeText={onChange}
                  style={[styles.input, styles.normalInput]}
                />
              )}
            />

            {
              <Text style={styles.errorText}>
                {errors.name && errors.name.message}
              </Text>
            }
            <FormText>Description</FormText>

            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  placeholder="Destination description"
                  placeholderTextColor="grey"
                  onChangeText={onChange}
                  style={[styles.input, styles.multilineInput]}
                />
              )}
            />
            {
              <Text style={styles.errorText}>
                {errors.description && errors.description?.message}
              </Text>
            }

            <FormText>Photo</FormText>
            <TouchableOpacity
              style={styles.cameraContainer}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <>
                  <Image
                    source={require("../../assets/images/camera.png")}
                    style={styles.camera}
                  />
                  <Text>Upload cover photo </Text>
                </>
              )}
            </TouchableOpacity>
            <FormText>Location</FormText>
            <MapSearch
              setLocation={setLocation}
              formattedAddress={formattedAddress}
            />
            <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
          </View>
          {selectedId ? (
            <>
              <FooterFormText onPress={handleAlert}>destination</FooterFormText>
            </>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default DestinationForm;

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    paddingBottom: 80,
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 50,
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    justifyContent: "space-between",
    borderRadius: 5,
  },

  deleteText: {
    textAlign: "center",
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    marginHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 10,
    marginTop: 2,
    marginBottom: 14,
    backgroundColor: "#E6E6E6",
    maxWidth: 340,
    maxHeight: 150,
    gap: 10,
  },

  image: {
    width: 340,
    height: 150,
    borderRadius: 20,
  },
  camera: {
    width: 45,
    height: 45,
  },
  input: {
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
    flex: 1,
  },
  normalInput: {
    height: 50,
    // borderColor: "red",
    // borderWidth: 6,
  },
  multilineInput: {
    height: 100,
  },
  errorText: {
    color: "red",
    marginHorizontal: 30,
  },
});
