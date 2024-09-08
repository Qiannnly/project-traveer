import { useEffect, useState } from "react";
import axios from "axios";
import { categories } from "@/standby/data"; // to remove with axios
import { CategoryTypes } from "@/types/global";

const useLoadCategories = () => {
  const [tripCategories, setTripCategories] = useState<CategoryTypes[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      // const { data } = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/categories`);
      setTripCategories(categories);
    };
    fetchCategories();
  }, []);
  return { tripCategories };
};

export default useLoadCategories;
