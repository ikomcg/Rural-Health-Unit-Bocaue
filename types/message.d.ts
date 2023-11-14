/* eslint-disable @typescript-eslint/no-explicit-any */
type Inbox = {
   id: string;
   to_id: string;
   to_user: UserType;
   to_name: string;
   to_profile: string;
   to_phone: string;
   from_id: string;
   from_user: UserType;
   from_name: string;
   from_profile: string;
   from_phone: string;
   message: string;
   created_at?: any;
   delete_to: string[];
};

type MessageType = {
   id: string;
   status: "del" | "not-del" | "sending";
   message: string;
   from: string;
   created_at: any;
   files: {
      url: string;
      type: string;
      name: string;
   }[];
   gap?: boolean;
};
