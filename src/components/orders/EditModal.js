import Spinner from "../Spinner";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "@/constants/orderStatus";
import { TbPencilCog } from "react-icons/tb";
import { updateOrderStatus } from "@/api/orders";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setOrderStatus } from "@/redux/order/orderSlice";

function EditOrderModal({
  showModal = false,
  setShowModal,
  defaultStatus,
  orderId,
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(defaultStatus);

  const dispatch = useDispatch();

  function editOrderStatus() {
    setLoading(true);

    updateOrderStatus(orderId, { status })
      .then(() => {
        toast.success("Status update successful!", { autoClose: 750 });
        dispatch(setOrderStatus("updated"));
      })
      .catch((error) => toast.success(error.response?.data, { autoClose: 750 }))
      .finally(() => {
        setLoading(false);
        setShowModal(false);
      });
  }

  return (
    <div className={showModal ? "block" : "hidden"}>
      <div className="w-full h-svh flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-[#00000033] z-50">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 opacity-100 p-5">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <IoMdClose className="w-5 h-5 " />
          </button>
          <div className="p-4 md:p-5 text-center">
            <TbPencilCog className="mx-auto mb-4 text-blue-500 w-12 h-12" />

            <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
              Update order status
            </h3>

            <div className="py-5">
              <select
                className="border px-5 py-2 rounded-md border-gray-300 w-64"
                defaultValue={defaultStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={ORDER_STATUS_PENDING}>PENDING</option>
                <option value={ORDER_STATUS_CONFIRMED}>CONFIRMED</option>
                <option value={ORDER_STATUS_SHIPPED}>SHIPPED</option>
                <option value={ORDER_STATUS_DELIVERED}>DELIVERED</option>
              </select>
            </div>

            <button
              onClick={editOrderStatus}
              disabled={loading}
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:opacity-80"
            >
              Update
              {loading && <Spinner className="w-4 h-4 fill-blue-500 ml-2" />}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrderModal;
