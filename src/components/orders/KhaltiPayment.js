import Image from "next/image";
import Spinner from "../Spinner";
import config from "@/config";
import khaltiIcon from "@/assets/images/khalti.png";
import { checkoutOrder } from "@/api/orders";
import { toast } from "react-toastify";
import { useState } from "react";

function KhaltiPayment({ order }) {
  const [loading, setLoading] = useState(false);

  function initiatePayment() {
    const orderId = order._id;

    setLoading(true);

    checkoutOrder(orderId, {
      returnUrl: `${config.appUrl}/orders/${orderId}/payment`,
      websiteUrl: config.appUrl,
    })
      .then((response) => {
        const data = response.data;

        window.location.href = data.payment_url;
      })
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => setLoading(false));
  }

  return (
    <button
      onClick={initiatePayment}
      type="button"
      disabled={loading}
      class="flex items-center gap-2 focus:outline-none text-white bg-[#5E338D] hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-80">
      Pay Via Khalti
      {loading ? (
        <Spinner className="h-5 w-5" />
      ) : (
        <Image src={khaltiIcon} alt="khalti" height={20} width={20} />
      )}
    </button>
  );
}

export default KhaltiPayment;
