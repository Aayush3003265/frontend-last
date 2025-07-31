import Link from "next/link";
import ProductCard from "../products/Card";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { getPopularProducts } from "@/api/products";
import TopRatedProducts from "../products/TopRatedProducts";

async function PopularProducts() {
  const response = await getPopularProducts();
  const products = response.data;

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-end mb-10">
          <TopRatedProducts />
        </div>
      </div>
    </section>
  );
}

export default PopularProducts;
