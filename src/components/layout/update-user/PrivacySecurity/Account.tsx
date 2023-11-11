import { FormControlLabel } from "@mui/material";
import { IOSSwitch } from "../../../mui/switch/Switch";
type AccountType = {
   payload: UserType;
   setPayload: React.Dispatch<React.SetStateAction<UserType | null>>;
};
const Account = ({ payload, setPayload }: AccountType) => {
   const { account_status } = payload;

   const OnChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;

      const value = name as "active" | "deactive" | "delete";

      setPayload((prev) => (prev ? { ...prev, account_status: value } : null));
   };
   return (
      <div className="px-3">
         <div
            style={{
               padding: "0 20px;",
            }}
         >
            <h4 className="font-semibold">Account</h4>
            <div className="ml-10 mt-3 flex flex-col">
               <FormControlLabel
                  label="Activate"
                  labelPlacement="end"
                  checked={account_status === "active"}
                  control={
                     <IOSSwitch
                        sx={{ m: 1 }}
                        name="active"
                        onChange={OnChangeStatus}
                     />
                  }
               />
               <span className="ml-12">
                  Active account can access website information.
               </span>
               <FormControlLabel
                  label="Deactive"
                  labelPlacement="end"
                  checked={account_status === "deactive"}
                  control={
                     <IOSSwitch
                        sx={{ m: 1 }}
                        name="deactive"
                        onChange={OnChangeStatus}
                     />
                  }
               />
               <span className="ml-12">
                  Deactivating your account is temporary. Your account account
                  will be disabled.
               </span>
               <FormControlLabel
                  label="Delete"
                  labelPlacement="end"
                  checked={account_status === "delete"}
                  control={
                     <IOSSwitch
                        sx={{ m: 1 }}
                        name="delete"
                        onChange={OnChangeStatus}
                     />
                  }
               />
               <span className="ml-12">
                  Deleting your account is permanent. Your account won’t be able
                  to retrieve the information.
               </span>
            </div>
         </div>
      </div>
   );
};

export default Account;
