import { createContext, PropsWithChildren } from "react";
import useDarkMode from "../hooks/useDarkMode";

interface AppContextProps {
    darkMode: boolean,
    handleDarkMode: () => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const AppProvider = ({children}: PropsWithChildren) => {
    const {darkMode, handleDarkMode} = useDarkMode();

    return(
        <AppContext.Provider value={{
            darkMode,
            handleDarkMode
        }}>
            {children}
        </AppContext.Provider>
    )
}