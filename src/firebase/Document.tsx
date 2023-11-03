import {
   DocumentData,
   DocumentReference,
   Query,
   getDoc,
   getDocs,
} from "firebase/firestore";

export const GetDocFireBase = async (
   documentRef: DocumentReference<DocumentData, DocumentData>
) => {
   return await getDoc(documentRef)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};

export const GetDocsFireBase = async (
   documentRef: Query<DocumentData, DocumentData>
) => {
   return await getDocs(documentRef)
      .then((res) => {
         return res;
      })
      .catch(() => {
         return null;
      });
};
