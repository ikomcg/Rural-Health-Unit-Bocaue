import { RapidAxiosInstance } from "../../sinch/Base";

export const CreateRapidApi = async (props: RequestApi) => {
   const { data, endPoint } = props;

   return await RapidAxiosInstance(props)
      .post(`https://clicksend.p.rapidapi.com/${endPoint}`, data)
      .then((res) => res.data)
      .catch(() => null);
};
