/* eslint-disable @typescript-eslint/no-explicit-any */
type ServiceType = {
   id: string;
   name: string;
   image: string;

   create_at: any;
};
type ScheduleService = {
   id: string;
   name: string;
   available_from: any;
   available_to: any;
   created_at: any;
};

type RequestService = {
   id: string;
   patient_name: string;
   patient_id: string;
   service_id: string;
   service_name: string;
   request_date: any;
   created_at: any;
   status: "pending" | "approve" | "decline";
};
type MedecineList = {
   id: string;
   name: string;
   descriptions: string;
   stock: number;
   created_at: any;
};
type RequestMedecines = {
   id: string;
   patient_name: string;
   patient_id: string;
   service_id: string;
   service_name: string;
   medecine_name: string;
   medecine_id: string;
   quantity: any;
   created_at: any;
   status: "pending" | "approve" | "decline";
};
