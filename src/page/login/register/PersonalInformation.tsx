import React, { SetStateAction } from "react";
import { Input, Select } from "../../../components/forms/Form";
import style from "./style.module.scss";

type PersonalInformationType = {
   HandleOnChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => void;
   OnChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
   setPassword: React.Dispatch<SetStateAction<string>>;
   payload: Register;
   password: string;
};
const PersonalInformation: React.FC<PersonalInformationType> = ({
   payload,
   HandleOnChange,
   // OnChangeFile,
}) => {
   return (
      <div className="px-5">
         <h3 className="text-xl mb-5 text-blue font-semibold">
            Personal Information
         </h3>
         <div className={style.card_information}>
            {/* <div style={{ width: "100%" }} className="mb-5">
               <Input
                  type="file"
                  name="profile"
                  placeholder="Profile Picture"
                  label="Profile Picture"
                  style={{
                     marginTop: 10,
                  }}
                  onChange={OnChangeFile}
               />
            </div> */}
            <Input
               type="text"
               name="last_name"
               placeholder="Last Name"
               label="Last Name"
               required
               value={payload.last_name}
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               name="first_name"
               placeholder="First Name"
               label="First Name"
               required
               value={payload.first_name}
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               name="middle_name"
               placeholder="Middle Name"
               label="Middle Name"
               value={payload.middle_name}
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               name="age"
               placeholder="Age"
               label="Age"
               required
               value={payload.age}
               onChange={HandleOnChange}
            />
            <Select
               name="gender"
               required
               placeholder="Gender"
               label="Gender"
               value={payload.gender}
               onChange={HandleOnChange}
            >
               <option value="" disabled>
                  ----
               </option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
            </Select>
            <Input
               type="number"
               name="contact_no"
               placeholder="Contact Number"
               label="Contact Number"
               required
               value={payload.contact_no}
               onChange={HandleOnChange}
            />
            <Input
               type="date"
               name="birthday"
               placeholder="Birth Day"
               label="Birth Day"
               required
               value={payload.birthday}
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               name="marital_status"
               placeholder="Marital Status"
               label="Marital Status"
               required
               value={payload.marital_status}
               onChange={HandleOnChange}
            />
         </div>
      </div>
   );
};

export default PersonalInformation;
