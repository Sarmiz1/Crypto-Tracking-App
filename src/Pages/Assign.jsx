import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0.01, "Price must be greater than 0"),
  category: z.enum(["Electronics", "Clothing", "Books", "Other"], {
    errorMap: () => ({ message: "Select a valid category" }),
  }),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  description: z
    .string()
    .max(200, "Description can be max 200 characters")
    .optional(),
  featured: z.boolean().optional(), // optional checkbox
});


export default function ProductForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              {...register("name")}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          {/* Price */}
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
          </div>

          {/* Category */}
          <div>
            <select
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              {...register("category")}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
          </div>

          {/* Stock */}
          <div>
            <input
              type="number"
              placeholder="Stock"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && <p className="text-red-600 text-sm">{errors.stock.message}</p>}
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description (optional)"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              {...register("description")}
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("featured")}
              id="featured"
            />
            <label htmlFor="featured">Featured Product</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
