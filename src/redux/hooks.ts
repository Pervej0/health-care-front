import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useDebounce = ({
  searchQuery,
  delay,
}: {
  searchQuery: string;
  delay: number;
}) => {
  const [debounceText, setDebounceText] = useState<string>("");
  useEffect(() => {
    const handler = setInterval(() => {
      setDebounceText(searchQuery);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debounceText;
};
