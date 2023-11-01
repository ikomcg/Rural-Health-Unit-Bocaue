import { enqueueSnackbar } from "notistack";
import { db } from "./Base";
import {
   addDoc,
   collection,
   doc,
   serverTimestamp,
   updateDoc,
} from "firebase/firestore";

type ReplyMessagesType = {
   message: string;
   id: string;
   from: string;
};

export const CreateMessages = async ({
   message,
   id,
   from,
}: ReplyMessagesType) => {
   if (message.trim() === "") return;

   const docData = {
      message: message,
      from,
      created_at: serverTimestamp(),
      status: "not-del",
   };

   return await addDoc(collection(db, "inbox", id, "messages"), docData)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         console.log("sending message", err);

         return null;
      });
};

export const SendMessages = async ({
   data
}: Params) => {

   return await addDoc(collection(db, "inbox"), data)
      .then((res) => {
         return res.id;
      })
      .catch((err) => {
         console.log("sending message", err);
         return null;
      });
};
type UpdateMessageType = {
   id: string;
   data: object;
};
export const UpdateMessage = async ({ id, data }: UpdateMessageType) => {
   return await updateDoc(doc(db, "inbox", id), data)
      .then((res) => {
         return res;
      })
      .catch((err) => {
         enqueueSnackbar(err, { variant: "error", autoHideDuration: 1000 });
         console.log("update message", err);
         return null;
      });
};
