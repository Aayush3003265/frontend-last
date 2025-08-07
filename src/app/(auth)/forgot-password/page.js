"use client";

import Spinner from "@/components/Spinner";
import { EMAIL_REGEX } from "@/constants/regex";
import { forgotPassword } from "@/api/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  function submitForm(data) {
    setLoading(true);

    forgotPassword(data)
      .then(() => {
        toast.success("Reset password link sent to your email!", {
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
        Forgot Password
      </h2>
      <form
        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        onSubmit={handleSubmit(submitForm)}
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address.",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="w-4 h-4" />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-700 dark:text-gray-300"
            >
              I accept the{" "}
              <a className="font-medium text-primary hover:underline" href="#">
                Terms and Conditions
              </a>
            </label>
          </div>
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

export default ForgotPasswordPage;
