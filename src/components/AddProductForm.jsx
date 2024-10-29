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
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        showToast("محصول با موفقیت اضافه شد", "success");
        setTimeout(() => {
          setIsShowAdd(false);
        }, 1500);
      },
      onError: (error) => {
        showToast("متاسفانه مشکلی پیش آمده است", "error");
      },
    });
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
      <label htmlFor="name">نام کالا</label>
      <input {...register("name")} id="name" />
      {errors.name && (
        <p className="text-[#F43F5E] text-[16px]">{errors.name.message}</p>
      )}
      <label htmlFor="quantity">تعداد موجودی</label>
      <input {...register("quantity")} id="quantity" />
      {errors.quantity && (
        <p className="text-[#F43F5E] text-[16px]">{errors.quantity.message}</p>
      )}
      <label htmlFor="price">قیمت</label>
      <input {...register("price")} id="price" />
      {errors.price && (
        <p className="text-[#F43F5E] text-[16px]">{errors.price.message}</p>
      )}
      <div>
        <button type="submit">ایجاد</button>
        <button onClick={closeHandler}>انصراف</button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default AddProductForm;
