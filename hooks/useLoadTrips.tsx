import { useEffect, useState } from "react";
import axios from "axios";
import { TripListTypes } from "@/types/global";
import { useAuthState } from "@/context/UserProvider";

const useLoadTrips = () => {
  const [trips, setTrips] = useState<TripListTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthState();

  const userId = user?.id;

  const fetchTrips = async () => {
    setIsLoading(true);

    try {
      if (userId) {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${userId}/limitedTrips`
        );
        const userTrips = data.data;

        setTrips(userTrips);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    // setTimeout(() => {
    //   setIsLoading(false); // Hide loader
    // }, 500);
  };

  useEffect(() => {
    if (userId) {
      fetchTrips(); // Only fetch trips if userId is available
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  return { trips, isLoading, reloadTrips: fetchTrips };
};

export default useLoadTrips;
