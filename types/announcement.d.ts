
type AnnouncementType = {
    id : string
    user : {
        name : string,
        profile : string
        user_id : string
    }
    images : string[]
    descriptions : string
    created_at : any


}
type CreateAnnouncementType = {
    images? : string[]
} & Pick<AnnouncementType, "descriptions" | "user">