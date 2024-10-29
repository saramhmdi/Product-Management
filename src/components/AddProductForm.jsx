import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";

import { addEditValidationForm, showToast } from "../utils/functions";
import { useCreateProduct } from "../services/mutations";

function AddProductForm({ setIsShowAdd }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addEditValidationForm()),
    mode: "onBlur",
  });

  const { mutate } = useCreateProduct();

  const handleResponse = (successMessage) => {
    reset();
    showToast(successMessage, "success");
    setTimeout(() => {
      setIsShowAdd(false);
    }, 1500);
  };

  const onSubmit = (data) => {
    try {
      mutate(data);
      handleResponse("محصول با موفقیت اضافه شد");
    } catch {
      showToast("متاسفانه مشکلی پیش آمده است", "error");
    }
  };

  const closeHandler = (e) => {
    e.preventDefault();
    showToast("شما از ایجاد محصول انصراف داده اید.", "info");
    setTimeout(() => {
      setIsShowAdd(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>ایجاد محصول جدید</p>
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
        <button type="submit">ایجاد</button>
        <button onClick={closeHandler}>انصراف</button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default AddProductForm;
