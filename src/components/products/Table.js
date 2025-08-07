import DeleteProductModal from "./Modal";
import Image from "next/image";
import Link from "next/link";
import placeholder from "@/assets/images/product-placeholder.jpeg";
import { BsImage } from "react-icons/bs";
import { IoIosCog } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";

function ProductsTable({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function removeProduct(product) {
    setShowModal(true);
    setSelectedProduct(product);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-slate-600 dark:border-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <BsImage className="h-6 w-6" />
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex justify-center">
                <IoIosCog className="h-6 w-6" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4">
                <div className="h-14 w-14">
                  <Image
                    src={product.imageUrls?.[0] ?? placeholder}
                    alt={product.name}
                    height={100}
                    width={100}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">{product.brand}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">Rs. {product.price}</td>
              <td className="px-6 py-4">{product.createdAt}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`/product-management/${product.id}/edit`}
                    className="bg-blue-600 dark:bg-blue-500 hover:opacity-90 p-1 rounded inline-block"
                  >
                    <MdOutlineModeEdit className="h-4 w-4 text-white" />
                  </Link>
                  <button
                    className="bg-red-600 dark:bg-red-500 hover:opacity-90 p-1 rounded"
                    onClick={() => removeProduct(product)}
                  >
                    <IoTrashOutline className="h-4 w-4 text-white" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteProductModal
        product={selectedProduct}
        setProduct={setSelectedProduct}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
}

export default ProductsTable;
