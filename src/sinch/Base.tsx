import axios from "axios";
import qs from "qs";

type AxiosInstanceType = object & Omit<RequestApi, "apiUrl">;

export const RapidAxiosInstance = (props: AxiosInstanceType) => {
   const { token, signal, params } = props;

   return axios.create({
      headers: {
         "content-type": "application/json",
         Authorization: `Basic ${token}`,
         "X-RapidAPI-Key": "c6ae2f0d09msh1a381fcefc7ea52p134fc2jsn67b4a9134f1f",
         "X-RapidAPI-Host": "clicksend.p.rapidapi.com",
         "Content-Type": "application/json",
      },
      paramsSerializer: {
         serialize: (params) => qs.stringify(params),
      },
      signal,
      params,
   });
};
