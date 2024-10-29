import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";

import { addEditValidationForm, showToast } from "../utils/functions";
import { useEditProduct } from "../services/mutations";

function EditProductForm({ setIsShowEdit, product }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addEditValidationForm()),
    mode: "onBlur",
    defaultValues: product,
  });

  const { mutate } = useEditProduct(product.id);

  const handleResponse = (successMessage, errorMessage) => {
    showToast(successMessage, "success");
    setTimeout(() => {
      setIsShowEdit(false);
    }, 1500);
  };

  const onSubmit = async (data) => {
    try {
      await mutate(data);
      reset();
      handleResponse(
        "محصول با موفقیت ویرایش شد",
        "متاسفانه مشکلی پیش آمده است"
      );
    } catch {
      showToast("متاسفانه مشکلی پیش آمده است", "error");
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    showToast("شما از ویرایش محصول انصراف داده اید.", "info");
    setTimeout(() => {
      setIsShowEdit(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>ویرایش اطلاعات</p>
      {["name", "quantity", "price"].map((field) => (
        <div key={field}>
          <label htmlFor={field}>
            {field === "name"
              ? "نام کالا"
              : field === "quantity"
              ? "تعداد موجودی"
              : "قیمت"}
          </label>
          <input {...register(field)} id={field} />
          {errors[field] && (
            <p className="text-[#F43F5E] text-[16px]">
              {errors[field].message}
            </p>
          )}
        </div>
      ))}
      <div>
        <button type="submit">ثبت اطلاعات جدید</button>
        <button onClick={closeHandler}>انصراف</button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default EditProductForm;
