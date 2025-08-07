"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-3 dark:text-white"
      >
        {showPassword ? <FiEye /> : <FiEyeOff />}
      </button>
    </div>
  );
}

export default PasswordField;
