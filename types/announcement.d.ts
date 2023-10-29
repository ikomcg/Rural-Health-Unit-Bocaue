/* eslint-disable @typescript-eslint/no-explicit-any */
type AnnouncementType = {
   id: string;
   user: {
      name: string;
      profile: string;
      user_id: string;
   };
   images: string[];
   descriptions: string;
   created_at: any;
};
type CreateAnnouncementType = {
   images?: string[];
} & Pick<AnnouncementType, "descriptions" | "user">;

type ToViewType = {
   images: string[];
   profile: string;
   name: string;
   datetime: string;
   descriptions: string;
};
