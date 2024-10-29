import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";

import { addEditValidationForm, showToast } from "../utils/functions";
import { useEditProduct } from "../services/mutations";
function EditProductForm({ setIsShowEdit, product }) {
  console.log(product.id);
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
  console.log(typeof Number(product.id));
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        showToast("محصول با موفقیت ویرایش شد", "success");
        setTimeout(() => {
          setIsShowEdit(false);
        }, 1500);
      },
      onError: (error) => {
        showToast("متاسفانه مشکلی پیش آمده است", "error");
      },
    });
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
        <button type="submit">ثبت اطلاعات جدید</button>
        <button onClick={closeHandler}>انصراف</button>
      </div>
      <ToastContainer />
    </form>
  );
}

export default EditProductForm;
