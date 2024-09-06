
export interface pacitentDataType {
    name: string;
    id: string;
    emailList: string;
    height: number;
    weight: number;
    age: number;
    gender: number;
    historical: string;
}

export interface optionsPacitents {
    label: string;
    id: string;
}

export interface certificateMedicalType {
    describe: string;
    id: string;
    name: string;
    start_date: string;
    end_date: string;
}