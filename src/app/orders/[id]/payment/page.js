"use client";
import Spinner from "@/components/Spinner";
import { ORDERS_ROUTE } from "@/constants/routes";
import { confirmOrder } from "@/api/orders";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ORDER_STATUS_CONFIRMED } from "@/constants/orderStatus";

function OrderPaymentPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transaction_id");
  const status = searchParams.get("status");

  const router = useRouter();

  useEffect(() => {
    confirmOrder(params.id, {
      status: status.toLowerCase(),
      transactionId,
    })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setLoading(false);

        setTimeout(() => {
          router.push(`${ORDERS_ROUTE}?status=${ORDER_STATUS_CONFIRMED}`);
        }, 1500);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="max-w-screen-xl container mx-auto px-4 py-10">
      {loading ? (
        <div className="rounded-xl gap-3 border border-slate-300 dark:border-slate-700 py-6 px-8 flex items-center justify-center flex-col bg-slate-100 dark:bg-slate-800">
          <Spinner className="h-10 w-10" />
          <h2 className="dark:text-white text-3xl">Verifying payment</h2>
        </div>
      ) : error ? (
        <div className="rounded-xl gap-3 border border-red-300 dark:border-red-700 py-6 px-8 flex items-center justify-center flex-col bg-red-100 dark:bg-red-800">
          <h2 className="dark:text-white text-3xl">Payment failed</h2>
          <p className="text-red-600 dark:text-white">Error: {error}</p>
        </div>
      ) : (
        <div className="rounded-xl gap-3 border border-green-300 dark:border-green-700 py-6 px-8 flex items-center justify-center flex-col bg-green-100 dark:bg-green-800">
          <h2 className="dark:text-white text-3xl">Payment successful</h2>
        </div>
      )}
    </section>
  );
}

export default OrderPaymentPage;
