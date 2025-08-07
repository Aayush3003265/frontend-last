import { PRODUCTS_ROUTE } from "@/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const DEFAULT_LIMIT = 10;
const DEFAULT_BRANDS_FILTER = [];
const DEFAULT_CATEGORY_FILTER = "";
const DEFAULT_MAX_PRICE = 100000000;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_SORT = JSON.stringify({
  createdAt: -1,
});

function ProductsDrawer({
  showFilters = true,
  setShowFilters,
  brands,
  categories,
}) {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [brandsFilter, setBrandsFilter] = useState(DEFAULT_BRANDS_FILTER);
  const [categoryFilter, setCategoryFilter] = useState(DEFAULT_CATEGORY_FILTER);
  const [maxPrice, setMaxPrice] = useState(DEFAULT_MAX_PRICE);
  const [minPrice, setMinPrice] = useState(DEFAULT_MIN_PRICE);
  const [sort, setSort] = useState(DEFAULT_SORT);

  const router = useRouter();
  const searchParams = useSearchParams();

  function handleBrandsFilterChange(brand) {
    setBrandsFilter((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item != brand)
        : [...prev, brand]
    );
  }

  function setFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", limit);
    params.set("min", minPrice);
    params.set("max", maxPrice);
    params.set("sort", sort);
    params.set("brands", brandsFilter.join(","));
    params.set("category", categoryFilter);

    router.push(`?${params.toString()}`);

    setShowFilters(false);
  }

  function resetFilter() {
    setBrandsFilter(DEFAULT_BRANDS_FILTER);
    setCategoryFilter(DEFAULT_CATEGORY_FILTER);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setMinPrice(DEFAULT_MIN_PRICE);
    setSort(DEFAULT_SORT);

    router.push(PRODUCTS_ROUTE);
    setShowFilters(false);
  }

  return (
    <div className={showFilters ? "block" : "hidden"}>
      <div
        onClick={() => setShowFilters(false)}
        className={`h-svh w-full bg-[#00000044] fixed top-0 left-0 right-0 bottom-0 z-30`}></div>
      <div
        className={`fixed top-12 left-0 z-40 w-72 h-screen px-4 pt-8 pb-14 overflow-y-auto transition-transform bg-white dark:bg-gray-800  ${
          showFilters ? "translate-x-0" : "-translate-x-72"
        }`}>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-800 uppercase dark:text-gray-200">
            Filter products
          </h4>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <IoMdClose className="w-5 h-5 " />
          </button>
        </div>
        <div className="py-4 overflow-y-auto">
          <div className="pb-4">
            <label
              htmlFor="limit"
              className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase inline-block pb-1">
              Limit
            </label>
            <select
              id="limit"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setLimit(e.target.value)}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="pb-4">
            <label
              htmlFor="orderBy"
              className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase inline-block pb-1">
              Order by
            </label>
            <select
              id="orderBy"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setSort(e.target.value)}>
              <option
                value={JSON.stringify({
                  createdAt: -1, // HTML attributedmust be string
                })}>
                Latest
              </option>
              <option
                value={JSON.stringify({
                  createdAt: 1,
                })}>
                Oldest
              </option>
              <option
                value={JSON.stringify({
                  price: -1,
                })}>
                Price: High to Low
              </option>
              <option
                value={JSON.stringify({
                  price: 1,
                })}>
                Price: Low to High
              </option>
              <option
                value={JSON.stringify({
                  name: 1,
                })}>
                Name: A-Z
              </option>
              <option
                value={JSON.stringify({
                  name: -1,
                })}>
                Name: Z-A
              </option>
            </select>
          </div>
          <div className="pb-4">
            <h5 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase pb-1">
              Price range
            </h5>
            <label
              htmlFor="min"
              className="block pb-1 text-sm font-medium text-gray-900 dark:text-white">
              Minimum price:
            </label>
            <input
              type="number"
              name="min"
              id="min"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              min={0}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <div className="h-2"></div>
            <label
              htmlFor="max"
              className="block pb-1 text-sm font-medium text-gray-900 dark:text-white">
              Maximum price:
            </label>
            <input
              type="number"
              name="max"
              id="max"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="100000000"
              min={0}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="pb-4">
            <label
              htmlFor="orderBy"
              className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase inline-block pb-1">
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">Select category</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="pb-4">
            <h5 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase mb-2">
              Brands filter
            </h5>
            {brands?.map((brand, index) => (
              <div key={index} className="flex items-center">
                <input
                  id={brand}
                  type="checkbox"
                  className="w-4 h-4"
                  checked={brandsFilter.includes(brand)}
                  onChange={() => handleBrandsFilterChange(brand)}
                />
                <label
                  htmlFor={brand}
                  className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={setFilters}
              className="inline-flex items-center justify-center w-full py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:opacity-80 disabled:opacity-80">
              Apply Filters
            </button>
            <button
              onClick={resetFilter}
              className="inline-flex items-center justify-center w-full py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:opacity-80 disabled:opacity-80">
              Reset Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsDrawer;
