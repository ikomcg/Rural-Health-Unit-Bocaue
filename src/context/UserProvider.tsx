import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

type ProviderType = {
   children: React.ReactNode;
};
type ContextType = {
   cookies?: UserType | null;
   saveCookies: (user: UserType) => void;
   deleteCookies: () => void;
   setLoading: (status: boolean, message?: string) => void;
};
export const UserProvider = createContext<ContextType>({
   saveCookies: () => {},
   deleteCookies: () => {},
   setLoading: () => {},
});

const Provider = ({ children }: ProviderType) => {
   const [cookies, setCookies, removeCookies] = useCookies(["session"]);
   const [isLoading, setIsLoading] = useState({
      isLoading: false,
      message: "" as string | undefined,
   });

   const saveCookies = (user: UserType) => {
      setCookies("session", JSON.stringify(user), { path: "/" });
   };
   const deleteCookies = () => {
      removeCookies("session");
   };

   const setLoading = (status: boolean, message?: string) => {
      setIsLoading((prev) => ({ ...prev, isLoading: status, message }));
   };

   return (
      <UserProvider.Provider
         value={{
            cookies: cookies.session,
            saveCookies,
            deleteCookies,
            setLoading,
         }}
      >
         {children}
         <Backdrop
            className="flex flex-col items-center"
            sx={{
               color: "#fff",
               zIndex: (theme) => theme.zIndex.drawer + 9999,
            }}
            open={isLoading.isLoading}
         >
            <CircularProgress color="inherit" />
            {isLoading.message ?? ""}
         </Backdrop>
      </UserProvider.Provider>
   );
};

export default Provider;
