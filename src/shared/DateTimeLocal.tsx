

const DateTimeLocal = (date: string) => {
   const now = new Date(date);
   const year = now.getFullYear();
   const month = (now.getMonth() + 1).toString().padStart(2, "0");
   const day = now.getDate().toString().padStart(2, "0");
   const hours = now.getHours().toString().padStart(2, "0");
   const minutes = now.getMinutes().toString().padStart(2, "0");
   const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;

   return formatted;
};

export default DateTimeLocal;
