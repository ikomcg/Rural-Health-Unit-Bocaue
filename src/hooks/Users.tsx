import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/Base";

type FetchUserType = {
   role: string[];
};
const useFetchUsers = ({ role }: FetchUserType) => {
   const [users, setUsers] = useState<UserType[] | null>();
   useEffect(() => {
      GetUserList();
   }, []);

   const GetUserList = async () => {
      const queryDB = query(
         collection(db, `users`),
         where("role", "array-contains-any", role)
      );
      onSnapshot(
         queryDB,
         (snapshot) => {
            const data = snapshot.docs.map((doc) => {
               const full_name = `${doc.data().first_name} ${
                  doc.data().middle_name
               } ${doc.data().last_name}`;
               return {
                  ...doc.data(),
                  full_name,
                  id: doc.id,
                  created_at: doc.data().created_at.toDate(),
               };
            }) as unknown as UserType[];
            setUsers(data);
         },
         (error) => {
            console.log("error users", error);
            setUsers(null);
         }
      );
   };

   return users;
};

export default useFetchUsers;
