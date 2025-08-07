import Spinner from "../Spinner";
import { ORDERS_ROUTE } from "@/constants/routes";
import { ORDER_STATUS_CONFIRMED } from "@/constants/orderStatus";
import { PiMoneyWavyDuotone } from "react-icons/pi";
import { confirmOrder } from "@/api/orders";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

function CashOnDelivery({ order }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function confirmPayment() {
    const orderId = order._id;

    setLoading(true);

    confirmOrder(orderId, {
      status: "completed",
      transactionId: crypto.randomUUID(),
      paymentMethod: "cash",
    })
      .then(() => {
        router.push(`${ORDERS_ROUTE}?status=${ORDER_STATUS_CONFIRMED}`);

        toast.success("Order confirmed! Payment via cash", { autoClose: 750 });
      })
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => setLoading(false));
  }

  return (
    <button
      onClick={confirmPayment}
      type="button"
      disabled={loading}
      class="flex items-center gap-2 focus:outline-none text-white bg-emerald-800 hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-80"
    >
      Cash on delivery
      {loading ? <Spinner className="h-5 w-5" /> : <PiMoneyWavyDuotone />}
    </button>
  );
}

export default CashOnDelivery;
