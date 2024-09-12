import { createContext, PropsWithChildren } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { appSettings } from "../settings/AppSetting";
import { env } from "../settings/env";

interface AppContextProps {
    darkMode: boolean,
    handleDarkMode: () => void;
    apiURL: string;
    apiKey: string;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const AppProvider = ({children}: PropsWithChildren) => {
    const {darkMode, handleDarkMode} = useDarkMode();
    const originURL = appSettings.URL.origin

    const getAPI = () => {
        if(originURL.includes('dev') || originURL.includes('localhost')){
            return{
                url: env.VITE_API_URL,
                key: ''
            }
        }else if(originURL.includes('medical-control')){
            return{
                url: env.VITE_API_URL,
                key: ''
            }
        }
        else{
            throw new Error(`Não foi possível detectar a origem do servidor: "${originURL}"`)
        }
    }

    const apiURL = getAPI()['url']
    const apiKey = getAPI()['key']

    return(
        <AppContext.Provider value={{
            darkMode,
            handleDarkMode,
            apiURL,
            apiKey
        }}>
            {children}
        </AppContext.Provider>
    )
}