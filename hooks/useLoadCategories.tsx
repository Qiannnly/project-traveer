import { useEffect, useState } from "react";
import { CategoryTypes } from "@/types/global";
import axios from "axios";

const useLoadCategories = () => {
  const [tripCategories, setTripCategories] = useState<CategoryTypes[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/categories`
      );
      setTripCategories(data);
    };
    fetchCategories();
  }, []);
  return { tripCategories };
};

export default useLoadCategories;
