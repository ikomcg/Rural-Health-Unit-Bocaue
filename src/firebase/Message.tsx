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
   files?: { url: string; type: string }[];
};

export const CreateMessages = async ({
   message,
   id,
   from,
   files,
}: ReplyMessagesType) => {
   const docData = {
      message: message,
      from,
      files,
      created_at: serverTimestamp(),
      status: "not-del",
   };

   console.log(docData);

   return await addDoc(collection(db, "inbox", id, "messages"), docData)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};

export const SendMessages = async ({ data }: Params) => {
   return await addDoc(collection(db, "inbox"), data)
      .then((res) => {
         return res.id;
      })
      .catch(() => {
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

         return null;
      });
};
