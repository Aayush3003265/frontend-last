import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import DeleteOrderModal from "./DeleteModal";

function DeleteOrderButton({ id }) {
  const [showModal, setShowModal] = useState(false);

  function removeOrder() {
    setShowModal(true);
  }

  return (
    <>
      <button
        className="bg-red-600 dark:bg-red-500 hover:opacity-90 p-1 rounded"
        onClick={removeOrder}
      >
        <IoTrashOutline className="h-4 w-4 text-white" />
      </button>
      <DeleteOrderModal
        showModal={showModal}
        setShowModal={setShowModal}
        orderId={id}
      />
    </>
  );
}

export default DeleteOrderButton;
