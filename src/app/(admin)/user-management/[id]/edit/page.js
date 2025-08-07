"use client";
import { getUserById } from "@/api/users";
import BackButton from "@/components/BackButton";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/users/Form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdateUserPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const params = useParams();

  const userId = params.id;

  useEffect(() => {
    getUserById(userId)
      .then((response) => setUser(response.data))
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <section className="py-3">
      <BackButton />

      <div className="py-5 px-4 mx-auto max-w-2xl">
        {loading ? (
          <div className="flex justify-center w-full">
            <Spinner className="h-10 w-10" />
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Edit <span className="italic">{user?.name}</span>
            </h2>

            <UserForm user={user} />
          </>
        )}
      </div>
    </section>
  );
}

export default UpdateUserPage;
