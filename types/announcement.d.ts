
type AnnouncementType = {
    id : string
    user : {
        name : string,
        profile : string
        user_id : string
    }
    images : string[]
    descriptions : string
    created_at : unknown


}
type CreateAnnouncementType = {
    images? : string[]
} & Pick<AnnouncementType, "descriptions" | "user">