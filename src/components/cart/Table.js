import Image from "next/image";
import placeholder from "@/assets/images/product-placeholder.jpeg";
import { FiMinus, FiPlus } from "react-icons/fi";
import { decreaseQuantity, increaseQuantity } from "@/redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { IoIosCog } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import RemoveFromCartModal from "./Modal";
import { useState } from "react";

function CartTable({ products }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const dispatch = useDispatch();

  function removeFromCart(product) {
    setSelectedProduct(product);
    setShowModal(true);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Total price
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
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <div className="h-14 w-14">
                  <Image
                    src={product.imageUrls[0] ?? placeholder}
                    className="w-full h-full object-cover rounded-md"
                    alt={product.name}
                    height={100}
                    width={100}
                  />
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => dispatch(decreaseQuantity(product))}
                    className="inline-flex border items-center justify-center rounded-full p-1 me-3 text-gray-500 hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 "
                    type="button">
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <p className="bg-gray-50 text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white border border-gray-300 py-1 px-3">
                    {product.quantity}
                  </p>
                  <button
                    onClick={() => dispatch(increaseQuantity(product))}
                    className="inline-flex border items-center justify-center rounded-full p-1 ms-3 text-gray-500 hover:bg-gray-100  dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 "
                    type="button">
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Rs. {product.price}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Rs. {product.price * product.quantity}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-center">
                  <button
                    className="bg-red-600 dark:bg-red-500 hover:opacity-90 py-1 px-2 rounded flex items-center gap-2 text-white"
                    onClick={() => removeFromCart(product)}>
                    Remove
                    <IoTrashOutline className="h-4 w-4 text-white" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RemoveFromCartModal
        showModal={showModal}
        setShowModal={setShowModal}
        product={selectedProduct}
      />
    </div>
  );
}

export default CartTable;
