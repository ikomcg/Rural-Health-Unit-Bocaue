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
   name: string;
   request_date: any;
   created_at: any;
   status :  "pending" | "accept" | "decline"
};
