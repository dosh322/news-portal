import { AppDispatch } from "app/providers/StoreProvider";
import { useDispatch } from "react-redux";

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
