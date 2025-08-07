"use client";

import { useState } from "react";
import ProductsDrawer from "./Drawer";
import { LuFilter } from "react-icons/lu";

function ProductFilters({ brands, categories }) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowFilters(true)}
        className="dark:text-white bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
      >
        <span>Filter</span> <LuFilter className="w-4 h-4 ml-1" />
      </button>

      <ProductsDrawer
        brands={brands}
        categories={categories}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />
    </>
  );
}

export default ProductFilters;
