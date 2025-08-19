"use client";

import { useSelector } from "react-redux";
import RatingStar from "./RatingStar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductRatingClient({
  productId,
  ratings = [],
  onRateSuccess,
}) {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;
  const token = user?.token; // assuming you store JWT token in user object

  const [canRate, setCanRate] = useState(false);

  // ✅ Check if user can rate this product
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/products/${productId}/can-rate`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCanRate(res.data.canRate);
      })
      .catch((err) => {
        console.error("Can rate check error:", err);
        setCanRate(false);
      });
  }, [userId, productId, token]);

  // Find user's rating
  const userRating = ratings?.find(
    (r) => (typeof r.user === "object" ? r.user._id : r.user) === userId
  );

  return (
    <div className="mt-4">
      {userRating ? (
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
          ⭐ You have rated this product {userRating.value} star
          {userRating.value > 1 ? "s" : ""}
        </p>
      ) : canRate ? (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            You haven’t rated this product yet.
          </p>
          <RatingStar
            productId={productId}
            initialRating={0}
            alreadyRated={false}
            MaxRating={5}
            onSubmitSuccess={onRateSuccess}
          />
        </>
      ) : (
        <p className="text-sm text-red-500 dark:text-red-400 mb-2">
          You can only rate this product after it is delivered.
        </p>
      )}
    </div>
  );
}
