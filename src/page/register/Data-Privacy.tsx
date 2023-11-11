import style from "./style.module.scss";
import DialogSlide from "../../components/mui/dialog/SlideModal";
import { Dispatch, SetStateAction } from "react";
import { RedButton } from "../../components/button/RedButton";

type DataPrivacyType = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
};
const DataPrivacy = ({ open, setOpen }: DataPrivacyType) => {
   return (
      <DialogSlide fullWidth={true} maxWidth="lg" open={open} setOpen={setOpen}>
         <div className={style.container_data_privacy}>
            <div className={style.header}>
               <h1>Rural Health Unit Bocaue, Bulacan</h1>
               <h2>Data Privacy</h2>
            </div>
            <article>
               <h2>I. Acts of Processing</h2>
               <p>RHU of Bocaue process Personal Data to</p>
               <ol>
                  <li>
                     Perform its obligations, exercise its rights, and conduct
                     its associated functions as a healthcare service provider.
                  </li>
               </ol>
            </article>
            <article>
               <h2> II. Personal Data Collected</h2>
               <p>
                  RHU of Bocaue collects the following Personal Data, as may be
                  applicable and necessary for its specific legitimate purposes:
               </p>
               <ol>
                  <li>
                     Personal details such as name, birth, gender, civil status
                     and affiliations;
                  </li>
                  <li>
                     Contact information such as address, email, mobile and
                     telephone numbers;
                  </li>
                  <li>
                     Medical information such as physical, psychiatric and
                     psychological information.
                  </li>
               </ol>
            </article>
            <article>
               <h2>III. Collection Method</h2>
               <p>
                  RHU of Bocaue collects Personal Data physically through
                  printed forms, attachments, and other documents required by
                  its medical units and administrative offices, or
                  electronically through electronic systems, electronic
                  platforms, e-forms, email, or electronic submission of
                  information directly by the Data Subject or by RHU associates.
               </p>
            </article>
            <article>
               <h2> IV. Timing of Collection </h2>
               <p>
                  RHU of Bocaue generally collects Personal Data from Data
                  Subjects upon entry to the hospital or at the onset of a
                  service.
               </p>
            </article>
            <article>
               <h2>V. Purpose of Collected Personal Data</h2>
               <p>
                  RHU of Bocaue collects and processes Personal Data for the
                  following purposes:
               </p>
            </article>
            <article>
               <h2>VI. Method of Use</h2>
               <p>
                  RHU of Bocaue uses Personal Data proportionately as necessary
                  for its legitimate purposes in accordance with RHU Policies.
                  Personal Data are used in accordance with the Data Privacy Act
                  of 2012, issued by the National Privacy Commission and the
                  Department of Health.
               </p>
            </article>
            <article>
               <h2>VII. </h2>
               <p>
                  A. Participation of patients and health workers (doctors,
                  nurses, midwives)
               </p>
               <ol>
                  <li>
                     RHU of Bocaue patients and health workers have the
                     following rights with respect to their Personal Data:
                  </li>
                  <li>Right to be informed, except for internal data;</li>
                  <li>
                     Right to access and data portability, subject to reasonable
                     requirements;
                  </li>
                  <li>
                     Right to rectification, erasure, and blocking. However,
                     services may be affected by changes in or lack of data; and
                  </li>
                  <li>
                     Right to file a complaint. RHU’s Data Protection Office and
                     Patient Experience Group are continually open to resolve
                     concerns.
                  </li>
               </ol>
            </article>
            <article>
               <p>
                  B. RHU of Bocaue patients and health workers, and others
                  within the scope of RHU’s Privacy Policy have the following
                  responsibilities:
               </p>
               <ol>
                  <li>
                     Keep up to date all Personal Data and other information
                     submitted to or in the possession of RHU;
                  </li>
                  <li>
                     Respect the data privacy rights of all Data Subjects;{" "}
                  </li>
                  <li>
                     Report any suspected Security Incident or Personal Data
                     Breach to RHU through the contact information of RHU Data
                     Protection Office provided herein;
                  </li>
                  <li>
                     Ensure accuracy of Personal Data and other information;{" "}
                  </li>
                  <li>
                     Obtain the consent of the Data Subject prior to processing
                     of personal information;
                  </li>
                  <li>
                     Not disclose to any unauthorized party any non-public
                     confidential, sensitive or personal information obtained or
                     learned in confidence directly or indirectly through RHU;
                     and
                  </li>
                  <li>
                     Abide by the policies, guidelines and rules of RHU on data
                     privacy, information security, records management, research
                     and ethical conduct, and from time-to-time, check for
                     updates on these policies, guidelines and rules and ensure
                     compliance there with
                  </li>
               </ol>
            </article>
         </div>
         <RedButton
            className="w-max mx-auto my-3 py-1"
            onClick={() => setOpen(false)}
         >
            Close
         </RedButton>
      </DialogSlide>
   );
};

export default DataPrivacy;
