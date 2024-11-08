import { createContext } from "react";
import { CoordinatesTypes } from "@/app/_layout";

export interface UserLocationContextType {
  userLocation: CoordinatesTypes | null;
}

export const UserLocationContext =
  createContext<UserLocationContextType | null>(null);
