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
      console.log("response", res.data());
      return res;
    })
    .catch((err) => {
      console.log("error get doc", err);
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
    .catch((err) => {
      console.log("error get docs", err);
      return null;
    });
};
