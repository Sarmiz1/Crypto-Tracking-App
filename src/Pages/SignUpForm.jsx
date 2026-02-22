import { IconContext } from "react-icons";
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle, AiFillGoogleCircle } from "react-icons/ai";
import { SiEtihadairways } from "react-icons/si";
import { useForm } from "react-hook-form";
import {
  MdOutlinePerson,
  MdLockOutline,
  MdOutlineMailOutline,
} from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { FaMale, FaFemale } from "react-icons/fa";
import { countries } from "../utils/countries";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  firstname: z.string().min(6, "First name must be atleast 6 chars"),
  lastname: z.string().min(6, "Last name must be atleast 6 chars"),
  gender: z.string().nonempty("Please select your gender"),
  country: z.string({ required_error: "Please select your country" }),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  email: z.string().email(),
  username: z.string().min(4, "Username must be atleast 4 chars"),
  password: z
    .string()
    .min(8, "Password must be atleast 8 chars")
    .max(10, "Password cant be less than 10 characters"),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
    gender: "",  // empty string by default
  },
  });

  const onsubmit = (data) => {
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
          <h1 className="font-bold text-4xl mb-10 mx-auto">SignUp</h1>

          <label className="mb-2"> First Name </label>
          <div className="relative mb-5">
            <IoIosPerson
              size={"22px"}
              className={`absolute left-2 -translate-y-1/2 text-gray-500 ${errors.firstname ? "top-[30%]" : "top-[40%]"}`}
            />

            <input
              type="text"
              placeholder="Type in your first name"
              className="w-full pl-10 border-2 h-8 p-5 border-black border-t-0 border-l-0 border-r-0 border-opacity-60
              focus:outline-none focus:border-blue-500 transition-colors duration-300 mb-2"
              {...register("firstname")}
            />

            {errors.firstname && (
              <p className="  text-red-700">{errors.firstname.message}</p>
            )}
          </div>

          <label className="mb-2"> Last Name</label>
          <div className="relative mb-5">
            <IoIosPerson
              size={"22px"}
              className={`absolute left-2 -translate-y-1/2 text-gray-500 ${errors.lastname ? "top-[30%]" : "top-[40%]"}`}
            />

            <input
              type="text"
              placeholder="Type in your first name"
              className="w-full pl-10 border-2 h-8 p-5 border-black border-t-0 border-l-0 border-r-0 border-opacity-60
              focus:outline-none focus:border-blue-500 transition-colors duration-300 mb-2"
              {...register("lastname")}
            />

            {errors.lastname && (
              <p className="  text-red-700">{errors.lastname.message}</p>
            )}
          </div>

          <div className="flex mb-5 gap-8">
            <label className="mb-2"> Gender </label>
            <div className="flex">
              <label htmlFor="male">Male</label>
              <FaMale size={"22px"} color="gray" />

              <input
                type="radio"
                value="male"
                id="male"
                className="w-9
                focus:outline-none focus:border-blue-500 transition-colors duration-300 mb-2 focus-within:ring-2"
                {...register("gender")}
              />
            </div>

            <div className="flex">
              <label htmlFor="female">Female</label>
              <FaFemale size={"22px"} color="gray" />

              <input
                type="radio"
                value="female"
                id="female"
                className="w-9 focus:outline-none focus:border-blue-500 transition-colors duration-300 mb-2 focus-within:ring-2"
                {...register("gender")}
              />
            </div>

            {errors.gender && (
              <p className="  text-red-700">{errors.gender.message}</p>
            )}
          </div>

          <select
            {...register("country")}
            className="h-10 rounded-md pl-4 mb-5"
          >
            <option value="">Country of Origin</option>
            {countries?.map((country) => (
              <option value={country.code}> {country.name}</option>
            ))}
          </select>
          {errors.country && <p>{errors.country.message}</p>}

          <div className="space-y-4 mb-5 p-4">
            <h2 className="font-semibold text-xl flex justify-center">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2 ">
                <label htmlFor="python">Python Language</label>
                <input
                  value="python"
                  id="python"
                  className="size-5 relative top-[2.5px]"
                  type="checkbox"
                  {...register("skills")}
                />
              </div>

              <div className="flex gap-2 ">
                <label htmlFor="javaScript">JavaScript Language</label>
                <input
                  className="size-5 relative top-[2.5px]"
                  value={"javaScript"}
                  id="javaScript"
                  type="checkbox"
                  {...register("skills")}
                />
              </div>

              <div className="flex gap-2">
                <label htmlFor="react">React Framework</label>
                <input
                  className="size-5 relative top-[2.5px]"
                  value="react"
                  id="react"
                  type="checkbox"
                  {...register("skills")}
                />
              </div>

              <div className="flex gap-2">
                <label htmlFor="reactNative">React Native Framework</label>
                <input
                  className="size-5 relative top-[2.5px]"
                  value={"reactNative"}
                  id="reactNative"
                  type="checkbox"
                  {...register("skills")}
                />
              </div>
            </div>
          </div>

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

          <span className="ml-auto mb-5">Have an account?</span>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? "bg-gray-500" : "bg-blue-500"} rounded-md h-10 text-white font-semibold mb-10`}
          >
            Create Account
          </button>
        </form>

        <div className="flex flex-col justify-center items-center gap-5">
          <h2 className="">Or Sign Up Using</h2>
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
