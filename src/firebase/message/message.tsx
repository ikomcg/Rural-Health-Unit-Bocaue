import { serverTimestamp } from "firebase/firestore";
import { CreateMessages, SendMessages, UpdateMessage } from "../Message";
import { enqueueSnackbar } from "notistack";

// --- create conversation
type CreateConversationType = {
   toMessage: {
      name: string;
      id: string;
      message: string;
      profile: string;
      to_phone: string;
   };
   from_id: string;
   from_name: string;
   from_profile: string;
   from_phone: string;
};
export const CreateConversation = async ({
   toMessage,
   from_id,
   from_name,
   from_profile,
   from_phone,
}: CreateConversationType) => {
   const send_message = await SendMessages({
      data: {
         message: toMessage.message,
         from_id,
         from_name,
         from_profile,
         from_phone,
         to_id: toMessage.id,
         to_name: toMessage.name,
         to_profile: toMessage.profile,
         to_phone: toMessage.to_phone,
         created_at: serverTimestamp(),
         update_at: serverTimestamp(),
      },
   });

   if (!send_message) {
      enqueueSnackbar("Message not sent!", { variant: "error" });
      return;
   }

   const _id = send_message; // response id after create new message

   const create_messages = await CreateMessages({
      message: toMessage.message,
      id: _id,
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
// ---

// --- update conversation
type UpdateConversationType = {
   message: string;
   convoID: string;
   from_id: string;
};
export const UpdateConversation = async ({
   message,
   convoID,
   from_id,
}: UpdateConversationType) => {
   await UpdateMessage({
      id: convoID,
      data: {
         update_at: serverTimestamp(),
         latest_message: message,
      },
   });

   const create_messages = await CreateMessages({
      message,
      id: convoID,
      from: from_id,
   });

   if (!create_messages) {
      enqueueSnackbar("Message not sent!", {
         variant: "error",
         autoHideDuration: 1000,
      });
      return;
   }

   // enqueueSnackbar('Message sent!',{'variant' : 'success', 'autoHideDuration' : 1000} )
};
// ---
