import { useEffect, useState } from "react";
import axios from "axios";
import { tripList } from "@/standby/data"; // to remove with axios
import { TripListTypes } from "@/types/global";

const useLoadTrips = () => {
  const [trips, setTrips] = useState<TripListTypes[]>();

  // const userID = 1
  useEffect(() => {
    const fetchTrips = async () => {
      // const { data } = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/trips?user=userId`);
      // setTrips(data);
      setTrips(tripList);
    };
    fetchTrips();
  }, []);
  return { trips };
};

export default useLoadTrips;
