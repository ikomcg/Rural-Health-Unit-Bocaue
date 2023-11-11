type BaseResponse<T> = {
   status: number;
   data: T[];
};

type ErrorResponse = {
   code: string;
   name: string;
};
type RequestApi = {
   abortController?: AbortController;
   apiUrl?: string;
   token: string;
   signal?: AbortSignal;
   params?: { [key: string]: string | number };
   limit?: number;
   page?: number;
   endPoint?: string;
   data?: { [key: string]: unknown };
};

type Params = {
   data?: { [key: string]: unknown };
   path?: string;
};
