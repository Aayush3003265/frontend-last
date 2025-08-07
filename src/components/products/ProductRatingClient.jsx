"use client";

import { useSelector } from "react-redux";
import RatingStar from "./RatingStar";

export default function ProductRatingClient({
  productId,
  ratings = [],
  onRateSuccess,
}) {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;

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
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          You haven’t rated this product yet.
        </p>
      )}

      <RatingStar
        productId={productId}
        initialRating={userRating?.value || 0}
        alreadyRated={!!userRating}
        MaxRating={5}
        onSubmitSuccess={onRateSuccess} // callback after rating submit
      />
    </div>
  );
}
