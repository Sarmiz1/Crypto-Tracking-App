import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { MdOutlinePerson } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(4, "username cant be less than 4"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 chars"),
  rememberMe: z.boolean().optional(),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const remembered = JSON.parse(localStorage.getItem("rememberMe"));
    if (remembered) {
      setValue("username", remembered.username);
      setValue("password", remembered.password);
      setValue("rememberMe", remembered.checked); // load the checkbox state
    }
  }, [setValue]);

  const onsubmit = (data) => {
    if (data.rememberMe) {
      localStorage.setItem(
        "rememberMe",
        JSON.stringify({
          username: data.username,
          password: data.password,
          checked: true, // save checkbox as true
        }),
      );
    } else {
      localStorage.removeItem("rememberMe");
    }

    reset();
  };

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col  items-center justify-center">
      <div className=" bg-white h-screen p-5 w-full">
        <form
          action="Post"
          className="flex flex-col"
          onSubmit={handleSubmit(onsubmit)}
        >
          <h1 className="font-bold text-4xl mb-10 mx-auto">Login</h1>

          <label className="mb-2"> Username </label>
          <div className="relative mb-5">
            <MdOutlinePerson
              size={"22px"}
              className={`absolute left-2 -translate-y-1/2 text-gray-500 ${errors.username ? "top-[30%]" : "top-1/2"}`}
            />

            <input
              type="text"
              placeholder="Type your username"
              className="w-full pl-10 border-2 h-8 p-5 border-black border-t-0 border-l-0 border-r-0 border-opacity-60
              focus:outline-none focus:border-blue-500 transition-colors duration-300 mb-2"
              {...register("username")}
            />

            {errors.username && (
              <p className="  text-red-700">{errors.username.message}</p>
            )}
          </div>

          <label> Password </label>
          <div className="relative">
            <MdLockOutline size={"22px"} className="absolute left-2 top-2" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Type your password"
              className="border-2 h-8 py-5 px-10 border-solid border-black border-t-0 border-l-0 border-r-0 border-opacity-60 outline-0 focus:outline-none mb-2 w-full

            focus:border-blue-500 transition-colors duration-300"
              {...register("password")}
            />
            {showPassword ? (
              <BiHide
                size={20}
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <BiShow
                size={20}
                className="absolute right-2 top-2 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}

            <div className="flex items-center gap-2 mb-5 text-sm">
              <input
                type="checkbox"
                {...register("rememberMe")}
                id="rememberMe"
                className="size-3 focus:ring-1"
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            {errors.password && (
              <p className=" text-red-700">{errors.password.message}</p>
            )}
          </div>

          <span className="ml-auto mb-5">Forgot password?</span>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full ${isSubmitting ? "bg-gray-500" : "bg-blue-500"} rounded-md h-10 text-white font-semibold mb-8`}
          >
            LOGIN
          </button>
        </form>

        <div className="flex flex-col justify-center items-center gap-4">
          <h2>Or Sign Up Using</h2>
          <div className="flex gap-1">
            <FaFacebook color="darkblue" size="40px" />
            <AiFillTwitterCircle size={"40px"} className="text-blue-400" />
            <AiFillGoogleCircle size={"40px"} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
