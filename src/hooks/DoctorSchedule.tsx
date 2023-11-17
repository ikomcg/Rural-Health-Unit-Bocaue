import {
   and,
   collection,
   doc,
   getDoc,
   limit,
   onSnapshot,
   or,
   orderBy,
   query,
   where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type ParamsType = {
   id: string | undefined;
};

type RerquestType = {
   user_id: string | undefined;
   _limit?: number;
} & ParamsType;

const useFetchDoctorSchedulesRequest = ({ id, user_id, _limit }: RerquestType) => {
   const [requests, setRequests] = useState<RequestService[] | null>();
   useEffect(() => {
      if (!id) return;
      GetRequests();
   }, [id, user_id]);

   const GetRequests = async () => {
      if (!id || !user_id) return;

      const queryDB = query(
         collection(db, "schedules"),
         and(
            where("doctor_assign", "==", user_id),
            or(where("service_id", "==", id))
         ),
         orderBy("request_date", "asc"),
         limit(_limit ?? 1000)
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            Promise.all(
               snapshot.docs.map(async (docu) => {
                  const data = docu.data();
                  const ref = doc(db, "users", data.patient_id);
                  const docSnap = await getDoc(ref);
                  const patient = docSnap.data() as UserType;
                  const patient_name = `${patient.first_name} ${patient.middle_name} ${patient.last_name}`;

                  if (data.doctor_assign && data.doctor_assign !== "") {
                     const ref = doc(db, "users", data.doctor_assign);

                     const docSnap = await getDoc(ref);
                     const doctor = docSnap.data() as UserType;
                     let full_name: string = "";
                     if (doctor) {
                        full_name = `${doctor.first_name} ${doctor.middle_name} ${doctor.last_name}`;
                     }

                     return {
                        ...docu.data(),
                        id: docu.id,
                        doctor: {
                           ...doctor,
                           full_name,
                        },
                        patient: {
                           ...patient,
                           full_name: patient_name,
                        },
                        request_date: docu.data().request_date.toDate(),
                     };
                  }

                  return {
                     ...docu.data(),
                     patient: {
                        ...patient,
                        full_name: patient_name,
                     },
                     id: docu.id,
                     request_date: docu.data().request_date.toDate(),
                  };
               }) as unknown as RequestService[]
            ).then((res) => {
               setRequests(res);
            });
         },
         (err) => {
            console.log(err);
            setRequests(null);
         }
      );
   };

   return requests;
};

export default useFetchDoctorSchedulesRequest;
