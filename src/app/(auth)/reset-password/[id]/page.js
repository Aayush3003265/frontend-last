"use client";

import PasswordField from "@/components/auth/PasswordField";
import Spinner from "@/components/Spinner";
import { resetPassword } from "@/api/auth";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  const params = useParams();
  const searchParams = useSearchParams();

  function submitForm(data) {
    setLoading(true);

    const id = params.id;
    const token = searchParams.get("token");

    console.log(token)

    resetPassword(id, token, data)
      .then(() => {
        toast.success("Password reset successful!", {
          autoClose: 750,
        });

        reset();
      })
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => setLoading(false));
  }

  return (
    <section>
      <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-5">
        Reset Password
      </h2>
      <form
        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New password
          </label>
          <PasswordField
            id="password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password length must be greater than 6.",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <PasswordField
            id="confirm-password"
            {...register("confirmPassword", {
              required: "Confirm password is required.",
              validate: (value) => {
                return value == password || "Passwords do not match.";
              },
            })}
          />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-primary hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-80"
        >
          <span>Submit</span>
          {loading && <Spinner className="h-5 w-5 ml-2" />}
        </button>
      </form>
    </section>
  );
}

export default ResetPasswordPage;
