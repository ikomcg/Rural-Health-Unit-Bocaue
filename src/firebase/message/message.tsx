import { serverTimestamp } from "firebase/firestore";
import { CreateMessages, SendMessages, UpdateMessage } from "../Message";
import { enqueueSnackbar } from "notistack";

// --- create conversation
type CreateConversationType = {
   toMessage: {
      id: string;
      message: string;
   };
   from_id: string;
};
export const CreateConversation = async ({
   toMessage,
   from_id,
}: CreateConversationType) => {
   const send_message = await SendMessages({
      data: {
         message: toMessage.message,
         from_id,
         to_id: toMessage.id,
         created_at: serverTimestamp(),
         update_at: serverTimestamp(),
      },
   });

   console.log(send_message);

   if (!send_message) {
      enqueueSnackbar("Message not sent!", { variant: "error" });
      return;
   }

   const _id = send_message; // response id after create new message

   const create_messages = await CreateMessages({
      message: toMessage.message,
      id: _id,
      files: [],
      from: from_id,
   });

   if (!create_messages) {
      enqueueSnackbar("Message not sent!", {
         variant: "error",
         autoHideDuration: 1000,
      });
      return;
   }

   enqueueSnackbar("Message sent!", {
      variant: "success",
      autoHideDuration: 1000,
   });
};

type UpdateConversationType = {
   message: string;
   convoID: string;
   from_id: string;
   files?: { url: string; type: string }[];
};
export const UpdateConversation = async ({
   message,
   convoID,
   from_id,
   files,
}: UpdateConversationType) => {
   await UpdateMessage({
      id: convoID,
      data: {
         update_at: serverTimestamp(),
         message: message.trim() === "" ? "sent a files" : message,
      },
   });

   await CreateMessages({
      message,
      id: convoID,
      files,
      from: from_id,
   });
};
