/* eslint-disable @typescript-eslint/no-explicit-any */
type AnnouncementType = {
   id: string;
   user: UserType;
   images: string[];
   descriptions: string;
   created_at: any;
};
type CreateAnnouncementType = {
   images?: string[];
   user: string;
} & Pick<AnnouncementType, "descriptions">;

type ToViewType = {
   images: string[];
   profile: string;
   name: string;
   datetime: string;
   descriptions: string;
};
