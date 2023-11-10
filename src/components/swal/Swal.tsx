import Swal, { SweetAlertCustomClass, SweetAlertOptions } from "sweetalert2";
import style from "./style.module.scss";
type CSwalType = {
   swalClass?: SweetAlertCustomClass;
} & SweetAlertOptions;

const CSwal = async (props: CSwalType) => {
   const { swalClass, ...swalProps } = props;

   const res = await Swal.fire({
      customClass: {
         container: style.container,
         popup: style.containerAlert,
         title: style.title,
         validationMessage: style.text,
         htmlContainer: style.ValidationMessage,
         actions: style.actionContainer,
         cancelButton: style.cancelButton,
         confirmButton: style.confirmButton,
         icon: style.iconAlert,
         ...swalClass,
      },
      ...swalProps,
   });
   return res.isConfirmed;
};

export default CSwal;
