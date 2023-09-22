
type BaseResponse<T,> = {
    status : number
    data : T[]
}

type ErrorResponse = {
    code : string
    name : string
}