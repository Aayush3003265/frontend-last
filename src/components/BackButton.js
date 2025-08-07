"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex items-center px-3 dark:text-white">
      <IoIosArrowRoundBack />
      Back
    </button>
  );
}

export default BackButton;
