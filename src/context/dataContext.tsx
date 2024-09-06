import { createContext, PropsWithChildren, useState } from "react";
import { certificateMedicalType, optionsPacitents, pacitentDataType } from "../types/dataTypes/pacitentTypes";

interface DataContextProps {
    pacitents: pacitentDataType[];
    setPacitents: React.Dispatch<React.SetStateAction<pacitentDataType[]>>;
    optionsPacitents: optionsPacitents[];
    setOptionsPacitents: React.Dispatch<React.SetStateAction<optionsPacitents[]>>,
    medicalCertificate: certificateMedicalType[]; 
    setMedicalCertificate: React.Dispatch<React.SetStateAction<certificateMedicalType[]>>
}

export const DataContext = createContext<DataContextProps>({} as DataContextProps)

export const DataProvider = ({children}: PropsWithChildren) => {
    const [pacitents, setPacitents] = useState<pacitentDataType[]>([])
    const [optionsPacitents, setOptionsPacitents] = useState<optionsPacitents[]>([])
    const [medicalCertificate, setMedicalCertificate] = useState<certificateMedicalType[]>([])

    return(
        <DataContext.Provider value={{
            pacitents,
            setPacitents,
            optionsPacitents, 
            setOptionsPacitents,
            medicalCertificate, 
            setMedicalCertificate
        }}>
            {children}
        </DataContext.Provider>
    )
}