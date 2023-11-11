import Swal, { SweetAlertCustomClass, SweetAlertOptions } from "sweetalert2";
import style from "./style.module.scss";
import withReactContent from "sweetalert2-react-content";

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

const JSXSwal = withReactContent(Swal);

type CSwalWithContentType = {
   children: React.ReactElement;
} & CSwalType;

export const JSXCSwal = async (props: CSwalWithContentType) => {
   const { children, swalClass, ...swalProps } = props;

   return await JSXSwal.fire({
      html: children,
      customClass: {
         title: style.title,
         confirmButton: style.confirmButton,
         htmlContainer: style.JSX_HtmlContainer,
         popup: style.popup,
         cancelButton: style.JSX_cancelButton,
         actions: style.JSX_containerAction,
         ...swalClass,
      },
      ...swalProps,
   }).then((result) => result.isConfirmed);
};
