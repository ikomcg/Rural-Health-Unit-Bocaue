/* eslint-disable @typescript-eslint/no-explicit-any */
type QueueList = {
   id: string;
   department: string;
   created_at: any;
   token_number: string;
   status: "current" | "waiting";
   patient: string;
};
