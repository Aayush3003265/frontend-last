import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_SHIPPED,
} from "@/constants/orderStatus";

function OrderStatus({ status }) {
  if (status == ORDER_STATUS_CONFIRMED) {
    return (
      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 uppercase">
        {status}
      </span>
    );
  }

  if (status == ORDER_STATUS_SHIPPED) {
    return (
      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 uppercase">
        {status}
      </span>
    );
  }

  if (status == ORDER_STATUS_DELIVERED) {
    return (
      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 uppercase">
        {status}
      </span>
    );
  }

  return (
    <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300 uppercase">
      {status}
    </span>
  );
}

export default OrderStatus;
