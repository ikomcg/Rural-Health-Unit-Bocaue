import { and, collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase/Base";
import { UserProvider } from "../context/UserProvider";

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
               const birthday = doc.data().birthday.toDate();
               const created_at = doc.data().created_at.toDate();
               
               return {
                  ...doc.data(),
                  full_name,
                  id: doc.id,
                  created_at,
                  birthday,
               };
            }) as unknown as UserType[];

            const filterData = data.filter(
               (item) => item.account_status === "active"
            );
            setUsers(filterData);
         },
         () => {
            setUsers(null);
         }
      );
   };

   return users;
};

export default useFetchUsers;

export const useFetchOnlineUsers = ({ role }: FetchUserType) => {
   const [users, setUsers] = useState<UserType[] | null>();
   const { cookies } = useContext(UserProvider);

   useEffect(() => {
      GetUserList();
   }, []);

   const GetUserList = async () => {
      if (!cookies) return;

      const queryDB = query(
         collection(db, `users`),
         and(
            where("role", "array-contains-any", role),
            where("status", "==", "online"),
            where("account_status", "==", "active")
         )
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
               };
            }) as unknown as UserType[];
            setUsers(data);
         },
         () => {
            setUsers(null);
         }
      );
   };

   return users;
};
