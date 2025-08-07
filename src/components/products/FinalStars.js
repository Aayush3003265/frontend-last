"use client";
import { useState } from "react";

import { rateProduct } from "@/api/products";

function FinalStars({ productId }) {
  const [rating, setRating] = useState(0);

  const handleRate = async (value) => {
    await rateProduct(productId, value);
    setRating(value);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => handleRate(star)}>
          <span
            className={star <= rating ? "text-yellow-400" : "text-gray-400"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default FinalStars;
