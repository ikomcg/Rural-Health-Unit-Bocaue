import { Timestamp } from "firebase/firestore";

export const TimeStampValue = (date: string) => {
   const dateObject = new Date(date);
   return Timestamp.fromDate(dateObject);
};
