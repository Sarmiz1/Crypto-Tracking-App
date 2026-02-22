import { IconContext } from "react-icons";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { SiEtihadairways } from "react-icons/si";
import { useForm } from "react-hook-form";
import { MdOutlinePerson } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password cant be more than 10 characters"),
    username: z.string().min(6, "Username must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if(data.password !== data.confirmPassword) {
      ctx.addIssue({
        path:['password'],
        message: 'Password must match',
        code: z.ZodIssueCode.custom
      })
      ctx.addIssue({
        path:['confirmPassword'],
        message: 'Password must match',
        code: z.ZodIssueCode.custom
      }) 
    }
  });

export default function FormTwo() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema)
  });

  const onsubmit = async (data) => {
    console.log(data);

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

          <label className="mb-2"> Email </label>
          <div className="relative mb-5">
            <MdOutlineMailOutline
              size={"22px"}
              className={`absolute left-2 -translate-y-1/2 text-gray-500 ${errors.username ? "top-[30%]" : "top-1/2"}`}
            />

            <input
              type="email"
              placeholder="Input your email address"
              className="w-full pl-10 border-2 h-8 p-5 border-black border-t-0 border-l-0 border-r-0 border-opacity-60
              focus:outline-none focus:border-blue-500 transition-colors duration-300 mb-2"
              {...register("email")}
            />

            {errors.email && (
              <p className="  text-red-700">{errors.email.message}</p>
            )}
          </div>

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
              type="password"
              placeholder="Type your password"
              className="border-2 h-8 py-5 px-10 border-solid border-black border-t-0 border-l-0 border-r-0 border-opacity-60 outline-0 focus:outline-none mb-2 w-full

            focus:border-blue-500 transition-colors duration-300"
              {...register("password")}
            />

            {errors.password && (
              <p className=" text-red-700">{errors.password.message}</p>
            )}
          </div>

          <label>Confirm Password </label>
          <div className="relative">
            <MdLockOutline size={"22px"} className="absolute left-2 top-2" />

            <input
              type="password"
              placeholder="Enter your password again"
              className="border-2 h-8 py-5 px-10 border-solid border-black border-t-0 border-l-0 border-r-0 border-opacity-60 outline-0 focus:outline-none mb-2 w-full

            focus:border-blue-500 transition-colors duration-300"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className=" text-red-700">{errors.confirmPassword.message}</p>
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
