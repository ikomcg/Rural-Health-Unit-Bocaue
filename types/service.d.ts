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
   patient_id: string;
   patient: UserType;
   service_id: string;
   service_name: string;
   doctor_assign: string;
   doctor: UserType;
   request_date: any;
   created_at: any;
   reason: string;
   status: "pending" | "approve" | "decline";
};
type Medecine = {
   id: string;
   name: string;
   batch_lot_no: string;
   stock_in: string | number;
   category: string;
};
type MedecineList = {
   id: string;
   batch_lot_no: string;
   medicines: InventoryList;
   category: string;
   stock_in: number;
   created_at: any;
};
type MedecineAdjusmentList = {
   id: string;
   medicines: InventoryList;
   reason: string;
   stock_out: number;
   created_at: any;
};
type RequestMedecines = {
   id: string;
   patient: UserType;
   medicine: InventoryList;
   medicine_id: string;
   quantity: any;
   created_at: any;
   status: "pending" | "approve" | "decline" | "release";
};
