import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { useLogin } from "../services/mutations";
import { getValidationSchema, showToast } from "../utils/functions";
import { setCookie } from "../utils/cookie";

function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getValidationSchema()),
    mode: "onBlur",
  });

  const { isLoading, isPending, mutate } = useLogin();
  console.log(isPending);
  console.log(isLoading);
  console.log(mutate);
  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        showToast("حساب کاربری شما با موفقیت ایجاد شد", "success");
        setCookie("token", data?.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
      onError: (error) => {
        showToast(error.response.data.message, "error");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[460px] max-h-[560px] border rounded-3xl border-[#E4E4E4] bg-[#ffffff] flex flex-col items-center p-6"
    >
      <div className="flex flex-col items-center pb-8">
        <img src="logo.svg" alt="logo" className="mb-4" />
        <p className="text-[#282828] text-[24px] font-medium">فرم ورود</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <input
          className="w-full h-[40px] text-[16px] bg-[#F2F2F2] text-[#28282880] rounded-xl text-right p-3"
          {...register("username")}
          placeholder="نام کاربری"
        />
        {errors.username && (
          <p className="text-[#F43F5E] text-[16px]">
            {errors.username.message}
          </p>
        )}

        <div className="relative">
          <input
            className="w-full h-[40px] text-[16px] bg-[#F2F2F2] text-[#28282880] rounded-xl text-right p-3"
            {...register("password")}
            placeholder="رمز عبور"
            type={showPassword ? "text" : "password"}
          />
          <span
            className="absolute left-3 top-3  cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
          {errors.password && (
            <p className="text-[#F43F5E] text-[16px]">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full h-[53px] bg-[#55A3F0] text-[#FFFFFF] text-[20px] font-semibold rounded-xl mt-4"
      >
        ورود
      </button>
      <ToastContainer />
      <Link
        to="/registration"
        className="  w-full mt-4 text-[#3A8BED] font-normal text-right"
      >
        ایجاد حساب کاربری!
      </Link>
    </form>
  );
}

export default RegistrationPage;
