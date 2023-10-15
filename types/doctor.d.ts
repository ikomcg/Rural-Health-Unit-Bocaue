/* eslint-disable @typescript-eslint/no-explicit-any */

type HealthWorkers = {
   id: string;
   name: string;
   role: string;
   created_at: unknown;
};
type PayloadType = {
   id: string;
   user_id: string;
   name: string;
   available_from: string;
   available_to: string;
};
type DoctorList = {
   id: string;
   user_id: string;
   name: string;
   available_from: any;
   available_to: any;
   created_at: any;
};
