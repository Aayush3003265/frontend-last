import { useState } from "react";
import EditOrderModal from "./EditModal";
import { MdOutlineModeEdit } from "react-icons/md";

function EditOrderButton({ id, defaultStatus }) {
  const [showModal, setShowModal] = useState(false);

  function editOrder() {
    setShowModal(true);
  }

  return (
    <>
      <button
        onClick={editOrder}
        className="bg-blue-600 dark:bg-blue-500 hover:opacity-90 p-1 rounded inline-block"
      >
        <MdOutlineModeEdit className="h-4 w-4 text-white" />
      </button>
      <EditOrderModal
        showModal={showModal}
        setShowModal={setShowModal}
        orderId={id}
        defaultStatus={defaultStatus}
      />
    </>
  );
}

export default EditOrderButton;
