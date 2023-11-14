export type AttachmentType = {
   file: File;
};

export const ValidImageTypeListToEdit = [
   "image/jpeg",
   "image/png",
   "image/gif",
   "image/jpg",
   "image/bmp",
];
export const ValidFileTypeListToEdit = ["video/mp4"];

export const ValidDocsListType = [
   "application/pdf",
   "application/msword",
   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
   "application/vnd.ms-excel",
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
export const ValidFileImport = [
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
export class AttachmentValidator {
   public _fileList: FileList | null;

   public constructor(_fileList: FileList | null) {
      this._fileList = _fileList;
   }

   public isEachFileLowerThan(mb: number) {
      if (!this._fileList) return false;
      let isLower = true;
      const byte = mb * 1024 * 1024;
      for (let i = 0; i < this._fileList.length; i++) {
         const tempFile = this._fileList.item(i);
         if (!tempFile || tempFile.size >= byte) {
            isLower = false;
            break;
         }
      }
      return isLower;
   }
   public isSizeLowerThan(mb: number, file: File) {
      return file.size / 1024 / 1024 < mb;
   }

   public isTypeValid(file: File) {
      return file.type.trim() !== "";
   }

   public isFileValid(file: File | null) {
      return file !== null;
   }
}
