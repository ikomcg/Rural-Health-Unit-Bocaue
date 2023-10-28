import { collection } from "firebase/firestore";
import { db } from "../../../../firebase/Base";
import { useEffect, useContext, useMemo } from "react";
import { UserProvider } from "../../../../context/UserProvider";
import { GetDocsFireBase } from "../../../../firebase/Document";
import Swal from "sweetalert2";
import style from "./Style.module.scss";

type ToType = {
   toMessage: string;
   users: UserType[] | null | undefined;
   setUsers: React.Dispatch<
      React.SetStateAction<UserType[] | null | undefined>
   >;
   setToMessage: React.Dispatch<
      React.SetStateAction<{
         name: string;
         id: string;
         message: string;
         profile: string;
      }>
   >;
};
const To = ({ toMessage, users, setToMessage, setUsers }: ToType) => {
   const { cookies } = useContext(UserProvider);

   useEffect(() => {
      const UserList = async () => {
         if (!cookies) return;

         const ref = collection(db, "users");

         const _users = await GetDocsFireBase(ref);
         if (!_users) {
            Swal.fire({
               icon: "error",
               text: "OOPS! Something went wrong",
            });
            return;
         }

         const data = _users.docs.map((doc) => {
            const full_name = `${doc.data().first_name} ${
               doc.data().middle_name
            } ${doc.data().last_name}`;

            return {
               ...doc.data(),
               id: doc.id,
               full_name,
            };
         }) as UserType[];

         setUsers(data);
      };

      UserList();
   }, []);

   const userList = useMemo(() => {
      if (!users) return [];

      const filterUsers = users.filter((item) =>
         item.full_name
            .toLocaleLowerCase()
            .includes(toMessage.toLocaleLowerCase())
      );

      return filterUsers;
   }, [users, toMessage]);

   return (
      <div
         className={`${style.to_message} ${
            !users || users.length === 0 ? "py-0" : "py-2"
         }`}
      >
         <ul>
            {users && userList.length === 0 ? (
               <span className="text-slate-300">No found users</span>
            ) : (
               userList.map((item) => {
                  const name = `${item.first_name} ${item.middle_name} ${item.last_name}`;
                  return (
                     <li
                        onClick={(e) => {
                           e.stopPropagation();
                           setToMessage((prev) => ({
                              ...prev,
                              name,
                              id: item.id,
                              profile: item.profile,
                           }));
                        }}
                     >
                        <img
                           src={item.profile}
                           alt=""
                           style={{
                              maxWidth: "30px",
                              width: "100%",
                              height: "30px",
                              clipPath: "circle()",
                           }}
                        />
                        {name}
                     </li>
                  );
               })
            )}
         </ul>
      </div>
   );
};

export default To;
