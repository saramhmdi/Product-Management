import * as yup from "yup";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { messages } from "../configs/constants";
const getValidationSchema = (includeConfirmPassword = false) => {
  const schema = {
    username: yup
      .string()
      .matches(/^[A-Za-z]+$/, "نام کاربری باید به انگلیسی وارد شود")
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
      .required("نام کاربری الزامی است"),
    password: yup
      .string()
      .min(4, "رمز عبور باید حداقل ۴ کاراکتر باشد")
      .required("رمز عبور الزامی است"),
  };

  if (includeConfirmPassword) {
    schema.confirmPassword = yup
      .string()
      .oneOf([yup.ref("password"), null], "رمز عبور و تأیید آن مطابقت ندارند")
      .required("تأیید رمز عبور الزامی است");
  }

  return yup.object().shape(schema);
};

const showToast = (message, type) => {
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  };
  const translatedMessage = messages[message] || message
  if (type === "success") {
    toast.success(translatedMessage, toastOptions);
  } else {
    toast.error(translatedMessage, toastOptions);
  }
};


export { getValidationSchema , showToast };
