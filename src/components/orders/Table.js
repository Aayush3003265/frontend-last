import { BsDot } from "react-icons/bs";
import { IoIosCog } from "react-icons/io";
import OrderStatus from "./Status";
import DeleteOrderButton from "./DeleteButton";
import EditOrderButton from "./EditButton";

function OrdersTable({ orders }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order Id
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Payment method
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex justify-center">
                <IoIosCog className="h-6 w-6" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                title={order.orderNumber}
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                # {index + 1}
              </th>
              <td className="px-6 py-4">{order.user?.name}</td>
              <td className="px-6 py-4">
                <ul>
                  {order.orderItems.map((item, productIndex) =>
                    item.product ? (
                      <li
                        key={productIndex}
                        className="flex gap-1 items-center"
                      >
                        <BsDot />
                        <span className="font-medium">
                          {item?.product?.name}
                        </span>
                        x {item.quantity}
                      </li>
                    ) : null
                  )}
                </ul>
              </td>
              <td className="px-6 py-4">Rs. {order.totalPrice}</td>
              <td className="px-6 py-4">
                {order.payment?.paymentMethod || "-"}
              </td>
              <td className="px-6 py-4">
                <OrderStatus status={order.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <EditOrderButton
                    id={order._id}
                    defaultStatus={order.status}
                  />
                  <DeleteOrderButton id={order._id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
