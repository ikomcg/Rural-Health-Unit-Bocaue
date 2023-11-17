import React, { SetStateAction, useState } from "react";
import style from "../../../style.module.scss";
import { useParams } from "react-router-dom";
import DialogSlide from "../../../../../../../components/mui/dialog/SlideModal";
import { AiFillCloseCircle } from "react-icons/ai";
import { BlueButton } from "../../../../../../../components/button/BlueButton";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import uuid from "react-uuid";
import CSwal from "../../../../../../../components/swal/Swal";
import { CreateAdjustmentMedecineFrb } from "../../../../../../../firebase/Service/Request";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../../../../../../firebase/Base";
import { useFetchMedecineListService } from "../../../../../../../hooks/Medecines";

type PostType = {
   isPost: boolean;
   setIsPost: React.Dispatch<SetStateAction<boolean>>;
};
type PayloadType = {
   id: string;
   name: string;
   reason: string;
   stock_out: string | number;
   status: string;
};

const AddAdjustment = ({ isPost, setIsPost }: PostType) => {
   const { id } = useParams();
   const medecines = useFetchMedecineListService({ id: id });
   const [isCreate, setIsCreate] = useState(false);
   const [payload, setPayload] = useState<PayloadType[]>([
      {
         id: uuid(),
         name: "",
         reason: "",
         stock_out: "",
         status: "pending",
      },
   ]);

   // const inventory = useFetchInventory();
   const OnClose = () => {
      setIsPost(false);
   };

   const CreateMedecines = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!id || !medecines) return;
      const filterData = payload.filter((item) => item.status !== "success");
      const _data = filterData.map((item) => ({
         id: item.id,
         name: item.name,
         reason: item.reason,
         stock_out: item.stock_out,
      }));

      if (_data.length === 0) return;
      setIsCreate(true);

      let index = 0;
      do {
         const medicine = medecines.find(
            (item) => item.medicines.id === _data[index].name
         );

         try {
            if (medicine) {
               const sfDocRef = doc(
                  db,
                  `medecines`,
                  id,
                  "medecines",
                  medicine.id
               );

               await runTransaction(db, async (transaction) => {
                  const sfDoc = await transaction.get(sfDocRef);
                  if (!sfDoc.exists()) {
                     throw "Document does not exist!";
                  }

                  const newStock =
                     Number(sfDoc.data().stock_in) -
                     Number(_data[index].stock_out);

                  if (
                     newStock > Number(sfDoc.data().stock_in) ||
                     newStock < 0
                  ) {
                     await CSwal({
                        icon: "question",
                        title: "Stock out is too big",
                     });
                     setIsCreate(false);
                     return Promise.reject();
                  } else {
                     transaction.update(sfDocRef, {
                        stock_in: newStock.toString(),
                     });

                     const data = await CreateAdjustmentMedecineFrb({
                        data: {
                           medicine_id: _data[index].name,
                           service_id: id,
                           stock_out: _data[index].stock_out,
                           reason: _data[index].reason,
                        },
                     });

                     if (!data) {
                        CSwal({
                           icon: "error",
                           title: "Something went wrong",
                           text: "Failed to Save",
                        });
                        return;
                     } else {
                        // if (index === _data.length || !_data[index].id) return;
                        // setPayload((prev) => [
                        //    ...prev.map((item) => {
                        //       if (item.id === _data[index].id) {
                        //          return {
                        //             ...item,
                        //             status: "success",
                        //          };
                        //       }
                        //       return item;
                        //    }),
                        // ]);
                     }

                     index++;
                  }
               });
            }
         } catch (e) {
            console.error(e);
         }

         if (index === _data.length) {
            CSwal({
               icon: "success",
               title: "Added Successfully",
            });
            OnClose();
         }
      } while (payload.length !== index);
   };

   const OnChangeHandle = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      uuid: string
   ) => {
      const { name, value } = e.target;

      setPayload((prev) => [
         ...prev.map((item) => {
            if (item.id === uuid) {
               return {
                  ...item,
                  [name]: value,
               };
            }
            return item;
         }),
      ]);
   };

   const OnRemoveHandle = (id: string) => {
      if (payload.length === 1) return;

      const filterPayload = payload.filter((item) => item.id !== id);
      setPayload(filterPayload);
   };

   return (
      <DialogSlide
         fullWidth={true}
         maxWidth="md"
         open={isPost}
         setOpen={OnClose}
      >
         <div className="p-3">
            <div className={style.header_post}>
               <h1>Adjustment</h1>
               <button type="button" onClick={OnClose}>
                  <AiFillCloseCircle />
               </button>
            </div>
            <form
               className="flex flex-col gap-3 flex-nowrap mt-5"
               id="adjustmentForm"
               onSubmit={CreateMedecines}
            >
               {payload.map((item) => (
                  <Form
                     key={item.id}
                     item={item}
                     OnChangeHandle={OnChangeHandle}
                     OnRemove={OnRemoveHandle}
                     medecines={medecines}
                  />
               ))}
            </form>
            <div className="flex flex-row justify-between mt-8">
               <BlueButton
                  type="submit"
                  form="adjustmentForm"
                  className="ml-auto py-2"
                  disabled={isCreate}
               >
                  Save
               </BlueButton>
            </div>
         </div>
      </DialogSlide>
   );
};

export default AddAdjustment;

type FormType = {
   item: PayloadType;
   OnRemove: (id: string) => void;
   OnChangeHandle: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      uuid: string
   ) => void;
   medecines: MedecineList[] | null | undefined;
};
const Form = ({ item, OnChangeHandle, OnRemove, medecines }: FormType) => {
   return (
      <div className="relative flex flex-row gap-3 mb-2">
         <div className="flex flex-col w-1/3">
            <label>Medecines Name:</label>
            <select
               id="name"
               name="name"
               required
               className="border border-1 px-2 py-2 outline-none"
               onChange={(e) => OnChangeHandle(e, item.id)}
               value={item.name}
            >
               <option value="">-----</option>
               {!medecines ? (
                  <option value="" disabled>
                     Loading
                  </option>
               ) : (
                  medecines.map((item) => (
                     <option value={item.id}>{item.medicines.name}</option>
                  ))
               )}
            </select>
         </div>
         <div className="flex flex-col  w-1/3">
            <label>Reason:</label>
            <select
               id="reason"
               required
               name="reason"
               className="border border-1 px-2 py-2 outline-none"
               onChange={(e) => OnChangeHandle(e, item.id)}
               value={item.reason}
            >
               <option value="">-----</option>
               <option value="EXPIRED">EXPIRED</option>
               <option value="TRANSFER">TRANSFER</option>
            </select>
         </div>
         <div className="flex flex-col w-1/3">
            <label>Stock Out:</label>
            <input
               required
               name="stock_out"
               value={item.stock_out}
               type="number"
               className="border border-blue px-2 py-[5px]  outline-none"
               onChange={(e) => OnChangeHandle(e, item.id)}
            />
         </div>
         <button
            className="absolute right-0 text-red-500 hover:bg-red-500 hover:text-white rounded-xl"
            title="remove"
            type="button"
            onClick={() => OnRemove(item.id)}
         >
            <MdOutlineRemoveCircleOutline />
         </button>
      </div>
   );
};
