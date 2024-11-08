import { ImageSourcePropType } from "react-native";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userToken: string;
};

export type CategoryTypes = {
  id: string;
  name: string;
  photoUrl;
};

export type FormValues = {
  name: string;
  description: string;
};

export type TripListTypes = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  photoUrl: string;
};

export type ImageCarouselType = {
  name: string;
  photoUrl: ImageSourcePropType;
};

export type DestinationsListType = {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  photoUrl: string;
};
