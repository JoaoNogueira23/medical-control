import { createContext, PropsWithChildren, useState } from "react";
import { certificateMedicalType, optionsPacitents, pacitentDataType } from "../types/dataTypes/pacitentTypes";
import { cardType } from "../types/chartsType/chatsTypes";

interface DataContextProps {
    pacitents: pacitentDataType[];
    setPacitents: React.Dispatch<React.SetStateAction<pacitentDataType[]>>;
    optionsPacitents: optionsPacitents[];
    setOptionsPacitents: React.Dispatch<React.SetStateAction<optionsPacitents[]>>,
    medicalCertificate: certificateMedicalType[]; 
    setMedicalCertificate: React.Dispatch<React.SetStateAction<certificateMedicalType[]>>
    cardsData: cardType[];
    setCardsData: React.Dispatch<React.SetStateAction<cardType[]>>;
}

export const DataContext = createContext<DataContextProps>({} as DataContextProps)

export const DataProvider = ({children}: PropsWithChildren) => {
    const [pacitents, setPacitents] = useState<pacitentDataType[]>([])
    const [optionsPacitents, setOptionsPacitents] = useState<optionsPacitents[]>([])
    const [medicalCertificate, setMedicalCertificate] = useState<certificateMedicalType[]>([])
    const [cardsData, setCardsData] = useState<cardType[]>([])

    return(
        <DataContext.Provider value={{
            pacitents,
            setPacitents,
            optionsPacitents, 
            setOptionsPacitents,
            medicalCertificate, 
            setMedicalCertificate,
            cardsData, 
            setCardsData
        }}>
            {children}
        </DataContext.Provider>
    )
}