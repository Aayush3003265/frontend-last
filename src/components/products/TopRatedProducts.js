"use client";
import { useEffect, useState } from "react";
import { getPopularProducts } from "@/api/products";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

export default function TopRatedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchTop() {
      try {
        const res = await getPopularProducts();
        // Limit to top 4
        setProducts(res.data.slice(0, 4));
      } catch (error) {
        console.error("❌ Failed to load top-rated products:", error.message);
      }
    }
    fetchTop();
  }, []);

  if (!products.length) return null;

  return (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🌟 Top Rated Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-5 bg-gray-50 dark:bg-gray-800 hover:shadow transition">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded"
            />

            <div className="mt-3">
              <Link
                href={`/products/${product._id}`}
                className="block text-lg font-semibold text-blue-700 dark:text-blue-400 hover:underline">
                {product.name}
              </Link>

              <div className=" flex justify-between items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  ⭐{" "}
                  <span className="font-medium">
                    {product.averageRating ?? "0.0"}
                  </span>{" "}
                  / 5<p>{product.ratingsCount} reviews</p>
                </p>

                {/* ✅ Add To Cart component */}
                <div className="mt-3">
                  <AddToCart product={product} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
