import { useState, useContext, FormEvent } from "react";
import { UserProvider } from "../../../../context/UserProvider";
import { RiSendPlaneFill } from "react-icons/ri";
import { UpdateConversation } from "../../../../firebase/message/message";

type ReplyType = {
   id: string;
};

const Reply = ({ id }: ReplyType) => {
   const { cookies } = useContext(UserProvider);
   const [myMessage, setMyMessage] = useState("");

   const Reply = async (e: FormEvent) => {
      e.preventDefault();
      if (!cookies || myMessage.trim() === "") return;
      setMyMessage("");

      await UpdateConversation({
         message: myMessage,
         convoID: id,
         from_id: cookies.id,
      });
   };

   return (
      <form
         className="flex flex-row items-center mb-3 mt-2 pr-2"
         onSubmit={Reply}
      >
         <input type="file" id="file_attachment" className="hidden" />
         <label htmlFor="file_attachment" className="cursor-pointer ">
            <img
               width="35"
               height="35"
               src="https://img.icons8.com/fluency/48/image--v1.png"
               alt="image--v1"
            />
         </label>

         <input
            className="outline-none bg-gray-200 w-full px-3 py-2 rounded-lg ml-2"
            type="text"
            placeholder="Aa"
            value={myMessage}
            onChange={(e) => setMyMessage(e.target.value)}
         />
         <button type="submit" className="cursor-pointer ml-2" title="send">
            <RiSendPlaneFill className={`text-2xl text-blue`} />
         </button>
      </form>
   );
};

export default Reply;
