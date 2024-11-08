import { useRef, useState, useMemo, useCallback } from "react";

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

import axios from "axios";
import "react-native-get-random-values";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import FormCalendar from "@/components/form/FormCalendar";
import { FormValues } from "@/types/global";
import { Button } from "@/components/button/Buttons";
import { router } from "expo-router";
import Duration from "@/components/form/Duration";
import FormText from "@/components/form/FormText";

import bottomSheetModal from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FormCategories from "@/components/form/FormCategories";
import { TripValidationSchema } from "@/utils/ValidationSchema";
import { useAuthState } from "@/context/UserProvider";

const CreateTripScreen = () => {
  const { user } = useAuthState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const userId = user?.id;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(TripValidationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

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

  const onSubmit = async (formData: FormValues) => {
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(storage, "tripPhoto/" + uuidv4() + ".jpg");

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log(snapshot);
      })
      .then((response) => {
        getDownloadURL(storageRef).then((url) => {
          createTrip(formData, url);
        });
      });
  };

  const createTrip = async (formData: FormValues, url: string) => {
    const { name, description } = formData;

    const { data } = await axios.post(
      `${process.env.EXPO_PUBLIC_BACKEND_URL}/trips`,
      {
        name,
        description,
        startDate,
        endDate,
        photoUrl: url,
        categories: selectedCategories,
        userId: userId,
      }
    );

    const tripId = data.data.id;
    const tripTitle = data.data.name;

    router.push({
      pathname: "/destination",
      params: { tripId, tripTitle },
    });
  };

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  const bottomSheetModalRef = useRef<bottomSheetModal>(null);

  return (
    <>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 15, paddingBottom: 80 }}
          >
            <TouchableOpacity
              style={styles.cameraContainer}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <>
                  <Image
                    source={require("../../../assets/images/camera.png")}
                    style={styles.camera}
                  />
                  <Text>Upload cover photo </Text>
                </>
              )}
            </TouchableOpacity>

            <FormText>Name</FormText>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Trip name"
                  placeholderTextColor="grey"
                  onChangeText={onChange}
                  value={value}
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
                  placeholder="Trip Description"
                  placeholderTextColor="grey"
                  onChangeText={onChange}
                  value={value}
                  style={[styles.input, styles.multilineInput]}
                />
              )}
            />
            {
              <Text style={styles.errorText}>
                {errors.description && errors.description?.message}
              </Text>
            }
            <FormText>Duration</FormText>

            <Duration
              onPress={handlePresentModal}
              startDate={startDate}
              endDate={endDate}
            />
            <FormText>Categories</FormText>
            <FormCategories
              setSelectedCategories={setSelectedCategories}
              selectedCategories={selectedCategories}
            />
            <Button onPress={handleSubmit(onSubmit)}>Publish</Button>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
            >
              <View style={styles.calendarContainer}>
                <Text style={styles.calendarText}>Select the dates</Text>
                <FormCalendar
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </View>
            </BottomSheetModal>
          </ScrollView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default CreateTripScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },

  backgroundHidden: {
    backgroundColor: "gray",
  },
  backgroundNotHidden: {
    backgroundColor: "#fff",
  },
  header: {
    fontWeight: "500",
    fontSize: 25,
    marginBottom: 30,
    textAlign: "center",
  },

  camera: {
    width: 50,
    height: 50,
  },
  calendarText: {
    fontSize: 15,
    marginBottom: 35,
    fontFamily: "poppins-medium",
  },
  calendarContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#EADDCA",
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    marginHorizontal: 50,
    paddingVertical: 25,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#E6E6E6",
    maxWidth: 290,
    maxHeight: 150,
  },

  image: {
    width: 290,
    height: 150,
    borderRadius: 20,
  },
  input: {
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 5,
  },
  normalInput: {
    height: 50,
  },
  multilineInput: {
    height: 100,
  },

  errorText: {
    color: "red",
    marginHorizontal: 50,
  },
});
