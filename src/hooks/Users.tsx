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
               return {
                  ...doc.data(),
                  full_name,
                  id: doc.id,
                  birthday,
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
            where("status", "==", "online")
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
