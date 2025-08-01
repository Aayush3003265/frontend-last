import Spinner from "../Spinner";
import { EMAIL_REGEX } from "@/constants/regex";
import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "@/constants/roles";
import { toast } from "react-toastify";
import { updateUser } from "@/api/users";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getRole, getRoles } from "@/helpers/users";

function UserForm({ user }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      city: user?.address.city,
      province: user?.address.province,
      street: user?.address.street,
      role: getRole(user?.roles),
    },
  });

  function submitForm(data) {
    setLoading(true);

    updateUser(user.id, {
      name: data.name,
      phone: data.phone,
      address: {
        street: data.street,
        city: data.city,
        province: data.province,
      },
      roles: getRoles(data.role),
    })
      .then(() => {
        toast.success("User updated successfully.", { autoClose: 750 });
      })
      .catch((error) => toast.error(error.response.data, { autoClose: 750 }))
      .finally(() => setLoading(false));
  }

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(submitForm)}>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John doe"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-100 dark:disabled:text-gray-300 dark:disabled:bg-gray-600"
          placeholder="name@company.com"
          disabled
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
      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone number
        </label>
        <input
          type="tel"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="9876543210"
          {...register("phone", {
            required: "Phone is required.",
          })}
        />
        <p className="text-red-500 text-sm">{errors.phone?.message}</p>
      </div>
      <div>
        <label
          htmlFor="street"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Street
        </label>
        <input
          type="text"
          id="street"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Baneshwor"
          {...register("street")}
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          City
        </label>
        <input
          type="text"
          id="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Kathmandu"
          {...register("city", {
            required: "Address city is required.",
          })}
        />
        <p className="text-red-500 text-sm">{errors.city?.message}</p>
      </div>
      <div>
        <label
          htmlFor="province"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Province
        </label>
        <select
          id="province"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("province", {
            required: "Province is required.",
          })}
          defaultValue="">
          <option value="" disabled>
            Select province
          </option>
          <option value="Bagmati">Bagmati</option>
          <option value="Gandaki">Gandaki</option>
          <option value="Karnali">Karnali</option>
          <option value="Koshi">Koshi</option>
          <option value="Lumbini">Lumbini</option>
          <option value="Madhesh">Madhesh</option>
          <option value="Sudurpashchim">Sudurpashchim</option>
        </select>
        <p className="text-red-500 text-sm">{errors.province?.message}</p>
      </div>

      <div>
        <label
          htmlFor="role"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Role
        </label>
        <select
          id="role"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("role")}
          defaultValue={ROLE_USER}>
          <option value={ROLE_USER}>{ROLE_USER}</option>
          {/* <option value={ROLE_MERCHANT}>{ROLE_MERCHANT}</option> */}
          <option value={ROLE_ADMIN}>{ROLE_ADMIN}</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-primary hover:opacity-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-80">
        <span>Update user</span>
        {loading && <Spinner className="h-5 w-5 ml-2" />}
      </button>
    </form>
  );
}

export default UserForm;
