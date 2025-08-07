import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import DeleteUserModal from "./DeleteModal";

function DeleteUserButton({ id }) {
  const [showModal, setShowModal] = useState(false);

  function removeUser() {
    setShowModal(true);
  }

  return (
    <>
      <button
        className="bg-red-600 dark:bg-red-500 hover:opacity-90 p-1 rounded"
        onClick={removeUser}
      >
        <IoTrashOutline className="h-4 w-4 text-white" />
      </button>
      <DeleteUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        userId={id}
      />
    </>
  );
}

export default DeleteUserButton;
