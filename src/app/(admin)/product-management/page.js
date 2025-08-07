"use client";

import Link from "next/link";
import ProductsTable from "@/components/products/Table";
import { getProductByUser, getProducts } from "@/api/products";
import { setDeleteStatus } from "@/redux/product/productSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ROLE_ADMIN } from "@/constants/roles";
import Spinner from "@/components/Spinner";

function ProductManagementPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { deleteStatus } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    getProductByUser()
      .then((response) => setProducts(response.data))
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => {
        setLoading(false);
        dispatch(setDeleteStatus(null));
      });
  }, [deleteStatus, dispatch]);

  function fetchAllProducts() {
    setLoading(true);

    getProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => setLoading(false));
  }

  return (
    <section className="p-5">
      <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center justify-between pb-5 px-1">
        <h1 className="font-semibold text-2xl dark:text-white">
          Product Management
        </h1>
        {user?.roles.includes(ROLE_ADMIN) && (
          <button
            onClick={fetchAllProducts}
            className="px-3 py-1 text-primary cursor-pointer hover:underline"
          >
            View all
          </button>
        )}

        <Link
          href="/product-management/add"
          className="bg-slate-200 rounded-lg px-3 py-1 dark:bg-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-900"
        >
          Add Product +
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <ProductsTable products={products} />
      )}
    </section>
  );
}

export default ProductManagementPage;
