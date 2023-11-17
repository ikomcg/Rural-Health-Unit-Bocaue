import React from "react";
import { Input, Select } from "../../../components/forms/Form";
import style from "./style.module.scss";
import { FormControlLabel } from "@mui/material";
import { IOSSwitch } from "../../../components/mui/switch/Switch";
import { BARANGAYS } from "../../register/PersonalInformation";

type PersonalInformationType = {
   HandleOnChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => void;
   payload: { role: string } & Omit<UserType, "role">;
   setPayload: React.Dispatch<
      React.SetStateAction<({ role: string } & Omit<UserType, "role">) | null>
   >;
   OnChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};
const PersonalInformation: React.FC<PersonalInformationType> = ({
   payload,
   setPayload,
   HandleOnChange,
   OnChangeFile,
}) => {
   const OnChangeVerify = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setPayload((prev) => (prev ? { ...prev, is_verify: checked } : null));
   };

   console.log(payload);
   return (
      <div className="px-3">
         <h3 className="text-xl mb-3 text-blue font-semibold">
            Personal Information
         </h3>
         <div className="flex flex-row mt-4">
            <div className="flex flex-col items-center justify-start w-1/4 border-r border-blue mr-3">
               <img
                  src={
                     !payload.profile || payload.profile === ""
                        ? "/image/profile.png"
                        : payload.profile
                  }
                  alt={payload.profile}
                  style={{
                     width: "100px",
                     height: "100px",
                     clipPath: "circle()",
                  }}
               />
               <label
                  htmlFor="profile"
                  className="text-xs text-blue cursor-pointer hover:underline"
               >
                  Change Profile
                  <input
                     type="file"
                     className="hidden"
                     id="profile"
                     onChange={OnChangeFile}
                  />
               </label>
               <h2 className="mt-3 text-sm text-center">{payload.full_name}</h2>
               <span>{payload.address ?? "-"}</span>
               <span
                  className={
                     payload.is_verify ? "text-green-500" : "text-gray-400"
                  }
               >
                  {payload.is_verify ? "Verify" : "Not-Verify"}
               </span>
            </div>
            <div className={style.card_information}>
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
                  value={payload.birthday.split("T")[0]}
                  onChange={HandleOnChange}
               />
               <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  label="Email"
                  required
                  value={payload.email}
                  disabled
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
               <Select
                  name="barangay"
                  required
                  placeholder="Barangay"
                  label="Branggay"
                  value={payload.barangay}
                  onChange={HandleOnChange}
               >
                  <option value="" disabled>
                     ----
                  </option>
                  {BARANGAYS.map((item) => (
                     <option key={item} value={item.toLocaleUpperCase()}>
                        {item}
                     </option>
                  ))}
               </Select>
               <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  label="Address"
                  required
                  value={payload.address}
                  onChange={HandleOnChange}
               />
               <FormControlLabel
                  className="mt-auto font-semibold"
                  label="Verify"
                  labelPlacement="top"
                  control={
                     <IOSSwitch
                        sx={{ m: 1 }}
                        checked={payload.is_verify}
                        onChange={OnChangeVerify}
                     />
                  }
               />
               <Select
                  name="role"
                  required
                  placeholder="Role"
                  label="Role"
                  onChange={HandleOnChange}
                  value={payload.role}
               >
                  <option value="" disabled>
                     ----
                  </option>
                  <option value="admin">Admin</option>
                  <option value="health-worker">health-worker</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
               </Select>
            </div>
         </div>
      </div>
   );
};

export default PersonalInformation;
