import { getBrands, getCategories, getProducts } from "@/api/products";
import ProductCard from "@/components/products/Card";
import ProductFilters from "@/components/products/Filters";
import LoadMoreProducts from "@/components/products/LoadMore";
import SearchProduct from "@/components/products/Search";

export const metadata = {
  title: "Products",
};

async function ProductsPage({ searchParams }) {
  const response = await getProducts(await searchParams);
  const brandsResponse = await getBrands();
  const categoriesResponse = await getCategories();

  const products = response?.data;
  const brands = brandsResponse?.data;
  const categories = categoriesResponse?.data;

  return (
    <section className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] items-center gap-3">
        <h1 className="text-4xl font-semibold dark:text-white">Our products</h1>
        <SearchProduct />
        <ProductFilters brands={brands} categories={categories} />
      </div>
      {products?.length > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-8">
          {products?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center py-10  text-lg text-red-500 w-full">
          No products found! Please try different keywords.
        </p>
      )}

      <LoadMoreProducts productCount={products.length} />
    </section>
  );
}

export default ProductsPage;
