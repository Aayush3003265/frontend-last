import DeleteUserButton from "./DeleteButton";
import Link from "next/link";
import { IoIosCog } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { USER_MANAGEMENT_ROUTE } from "@/constants/routes";

function UsersTable({ users }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              S.N.
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Roles
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex justify-center">
                <IoIosCog className="h-6 w-6" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}.
              </th>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">
                {user?.address.city}, {user?.address.province}
              </td>
              <td className="px-6 py-4">{user.roles?.join(", ")}</td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`${USER_MANAGEMENT_ROUTE}/${user.id}/edit`}
                    className="bg-blue-600 dark:bg-blue-500 hover:opacity-90 p-1 rounded inline-block"
                  >
                    <MdOutlineModeEdit className="h-4 w-4 text-white" />
                  </Link>
                  <DeleteUserButton id={user.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
