"use client";

import { useState } from "react";
import AuthUserPopup from "./AuthUserPopup";
import Image from "next/image";
import placeholder from "@/assets/images/product-placeholder.jpeg";

function AuthUser({ user }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative">
      <button className="rounded-full border-2 border-primary p-0.5" onClick={() => setShowPopup(!showPopup)}>
        <Image
          src={user.profileImageUrl ?? placeholder}
          alt=""
          height={32}
          width={32}
          className="w-8 h-8 rounded-full"
        />
      </button>
      {showPopup && <AuthUserPopup user={user} setShowPopup={setShowPopup} />}
    </div>
  );
}

export default AuthUser;
