import { useEffect, useState } from "react";
import axios from "axios";
import { TripListTypes } from "@/types/global";
import { useAuthState } from "@/context/UserProvider";

const useLoadTrips = () => {
  const [trips, setTrips] = useState<TripListTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthState();

  const userId = user?.id;
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);

      setTimeout(async () => {
        try {
          if (userId) {
            const { data } = await axios.get(
              `${process.env.EXPO_PUBLIC_BACKEND_URL}/users/${userId}/limitedTrips`
            );
            const userTrips = data.data;
            setIsLoading(false);

            setTrips(userTrips);
          }
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }, 2000);
    };

    fetchTrips();
  }, [userId]);
  return { trips, isLoading };
};

export default useLoadTrips;
