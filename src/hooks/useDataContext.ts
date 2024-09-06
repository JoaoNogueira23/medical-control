import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export default function useDataContext(){
    return useContext(DataContext);
}