import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ===========================
   ZOD SCHEMA
=========================== */

const profileSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    age: z.coerce
      .number()
      .int("Age must be a whole number")
      .min(13, "You must be at least 13"),

    bio: z
      .string()
      .max(160, "Bio cannot exceed 160 characters")
      .optional(),

    address: z.object({
      city: z.string().min(2, "City is required"),
      country: z.string().min(2, "Country is required"),
      zip: z.string().min(5, "ZIP must be at least 5 characters"),
    }),

    social: z.object({
      twitter: z.string().url("Must be a valid URL").optional(),
      github: z.string().url("Must be a valid URL").optional(),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.age < 18 && !data.bio) {
      ctx.addIssue({
        path: ["bio"],
        message: "Bio is required if under 18",
        code: z.ZodIssueCode.custom,
      });
    }
  });

/* ===========================
   COMPONENT
=========================== */

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Profile Form
        </h1>

        {/* USERNAME */}
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            {...register("username")}
            className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            {...register("email")}
            className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* AGE */}
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            {...register("age")}
            className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">
              {errors.age.message}
            </p>
          )}
        </div>

        {/* BIO */}
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            {...register("bio")}
            rows="3"
            className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">
              {errors.bio.message}
            </p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">City</label>
            <input
              {...register("address.city")}
              className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm">
                {errors.address.city.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Country</label>
            <input
              {...register("address.country")}
              className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
            />
            {errors.address?.country && (
              <p className="text-red-500 text-sm">
                {errors.address.country.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">ZIP</label>
            <input
              {...register("address.zip")}
              className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
            />
            {errors.address?.zip && (
              <p className="text-red-500 text-sm">
                {errors.address.zip.message}
              </p>
            )}
          </div>
        </div>

        {/* SOCIAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Twitter URL</label>
            <input
              {...register("social.twitter")}
              className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
            />
            {errors.social?.twitter && (
              <p className="text-red-500 text-sm">
                {errors.social.twitter.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">GitHub URL</label>
            <input
              {...register("social.github")}
              className="w-full border-b-2 focus:outline-none focus:border-blue-500 transition"
            />
            {errors.social?.github && (
              <p className="text-red-500 text-sm">
                {errors.social.github.message}
              </p>
            )}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            isSubmitting
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
