import { Input } from "../../../components/forms/Form";
import style from "./style.module.scss";

type PersonalInformationType = {
   payload: Register;
   OnChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
   HandleOnChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => void;
};

const HealtInformation: React.FC<PersonalInformationType> = ({
   payload,
   HandleOnChange,
   // OnChangeFile,
}) => {
   return (
      <div className="px-5 mb-10">
         <h3 className="text-xl mb-5 text-blue font-semibold">
            Health Information
         </h3>
         <div className={style.card_information}>
            <Input
               type="text"
               value={payload.past_medical}
               name="past_medical"
               placeholder="Past Medical History"
               label="Past Medical History"
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               value={payload.physical_examination}
               name="physical_examination"
               placeholder="Physical Examination"
               label="Physical Examination"
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               value={payload.vital_sign}
               name="vital_sign"
               placeholder="Vital Sign"
               label="Vital Sign"
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               value={payload.diagnosis}
               name="diagnosis"
               placeholder="Diagnosis"
               label="Diagnosis"
               onChange={HandleOnChange}
            />
            <Input
               type="text"
               value={payload.treatment}
               name="treatment"
               placeholder="Treatment"
               label="Treatment"
               onChange={HandleOnChange}
            />
            {/* <Input
               required
               type="file"
               name="birth_certificate"
               accept="image/*, .pdf"
               placeholder="Birth Certificate"
               label="Birth Certificate"
               onChange={OnChangeFile}
            /> */}
         </div>
      </div>
   );
};

export default HealtInformation;
