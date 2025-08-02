"use client";

import { useSelector } from "react-redux";
import RatingStar from "./RatingStar";

export default function ProductRatingClient({ productId, ratings = [] }) {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;
  const userRating = ratings?.find((r) => r.user === userId);

  return (
    <div className="mt-4">
      <RatingStar
        productId={productId}
        initialRating={userRating?.value || 0}
        alreadyRated={!!userRating}
        MaxRating={5}
      />
    </div>
  );
}
