/* eslint-disable @typescript-eslint/no-explicit-any */
type Inbox = {
    id : string
    to_id : string
    to_name : string
    to_profile : string
    from_id : string
    from_name : string
    from_profile : string
    latest_message : string
    created_at? : any
    delete_to : string[]
}

type MessageType = {
    id : string
    status : "del" | "not-del" | "sending"
    message : string
    from : string
    created_at : any
    gap? : boolean
}