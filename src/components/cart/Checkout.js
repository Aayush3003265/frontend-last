"use client";
import Spinner from "../Spinner";
import { RxDividerVertical } from "react-icons/rx";
import { clearCart } from "@/redux/cart/cartSlice";
import { createOrder } from "@/api/orders";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE, ORDERS_ROUTE } from "@/constants/routes";

function Checkout({ products, totalPrice }) {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const router = useRouter();

  function checkoutOrder() {
    if (!user) return router.push(LOGIN_ROUTE);

    setLoading(true);
    console.log(products);

    createOrder({
      orderItems: products.map((item) => ({
        product: item._id || item.id,
        quantity: item.quantity,
      })),
      totalPrice,
    })
      .then(() => {
        router.push(ORDERS_ROUTE);

        toast.success("Order created successfully.", {
          autoClose: 750,
          onClose: () => {
            dispatch(clearCart());
          },
        });
      })
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => setLoading(false));
  }
  // function checkoutOrder() {
  //   if (!user) return router.push(LOGIN_ROUTE);

  //   setLoading(true);
  //   console.log(products);
  //   console.log("Order Items:", orderItems);

  //   const orderItems = products.map((item) => ({
  //     product: typeof item._id === "string" ? item._id : item.id,
  //     quantity: Number(item.quantity) || 1,
  //   }));

  //   createOrder({
  //     orderItems,
  //     totalPrice,
  //   })
  //     .then(() => {
  //       router.push(ORDERS_ROUTE);

  //       toast.success("Order created successfully.", {
  //         autoClose: 750,
  //         onClose: () => {
  //           dispatch(clearCart());
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       const msg =
  //         error?.response?.data || error?.message || "Failed to create order";
  //       toast.error(msg, { autoClose: 750 });
  //     })
  //     .finally(() => setLoading(false));
  // }

  return (
    <div className="flex justify-end py-3">
      <button
        disabled={loading}
        onClick={checkoutOrder}
        className="flex gap-1 items-center font-medium bg-primary px-5 py-2 rounded-md shadow text-white hover:opacity-90 cursor-pointer disabled:opacity-75">
        <span>Checkout</span>
        {/* <RxDividerVertical /> */}
        <span>Rs. {totalPrice}</span>
        {loading && <Spinner className="ml-2 h-4 w-4" />}
      </button>
    </div>
  );
}

export default Checkout;
