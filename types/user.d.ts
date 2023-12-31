type UserType = {
   id: string;
   profile: string;
   full_name: string;
   first_name: string;
   last_name: string;
   middle_name: string;
   role: string[];
   status: string;
   contact_no: string;
   email: string;
   address: string;
   age: number;
   birth_Certificate: string;
   birthday: string;
   diagnosis: string;
   gender: string;
   is_verify: boolean;
   marital_status: string;
   past_medical: string;
   physical_examination: string;
   treatment: string;
   vital_sign: string;
   barangay: string;
   account_status: "active" | "deactive" | "delete";
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   created_at: any;
};
