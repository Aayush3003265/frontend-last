"use client";
import PropTypes from "prop-types";
import { useState } from "react";
import { rateProduct } from "@/api/products";
import { toast } from "react-toastify";

export default function RatingStar({
  color = "#fcc419",
  size = 24,
  MaxRating = 5,
  productId,
  initialRating = 0,
  alreadyRated = false,
}) {
  const [submitted, setSubmitted] = useState(alreadyRated);
  const [loading, setLoading] = useState(false);
  const [temprating, setTempRating] = useState(0);
  const [rating, setRating] = useState(initialRating);

  const ContainerStyle = {
    display: "flex",
    gap: 16,
    alignItems: "center",
  };

  const StarContainerStyle = {
    display: "flex",
  };

  const textStyle = {
    lineHeight: 1,
    margin: 0,
    color: color,
    fontSize: "24px",
  };

  const HandleRatingStar = (val) => {
    if (!submitted) setTempRating(val);
  };

  const HandleResetRating = () => {
    setTempRating(0);
  };

  const handleSubmit = async () => {
    if (!rating || submitted) return;

    try {
      setLoading(true);
      console.log("Submitting rating:", { productId, rating });
      await rateProduct(productId, rating);
      setSubmitted(true);
      toast.success("✅ Rating submitted");
    } catch (error) {
      console.error(
        "❌ Error submitting rating:",
        error?.response?.data || error.message
      );
      toast.error("❌ Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={ContainerStyle}>
      <div style={StarContainerStyle}>
        {Array.from({ length: MaxRating }, (_, index) => (
          <div key={index}>
            <Star
              full={temprating ? temprating >= index + 1 : rating >= index + 1}
              color={color}
              size={size}
              setRating={() => HandleRatingStar(index + 1)}
              HandleResetRating={HandleResetRating}
              handelRating={() => {
                if (!submitted) setRating(index + 1);
              }}
              disabled={submitted}
            />
          </div>
        ))}
      </div>

      <p style={textStyle}>{temprating || rating || ""}</p>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 px-4 py-1 rounded bg-yellow-500 text-white disabled:opacity-50">
          {loading ? "Submitting..." : "Submit Rating"}
        </button>
      )}

      {submitted && (
        <span className="text-green-600 text-sm ml-2 font-semibold">
          ✔️ You rated this product {rating} star{rating > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

const Star = ({
  color,
  size,
  setRating,
  HandleResetRating,
  full,
  handelRating,
  disabled,
}) => {
  const StarStyle = {
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <span
      style={StarStyle}
      onMouseEnter={disabled ? undefined : setRating}
      onMouseLeave={disabled ? undefined : HandleResetRating}
      onClick={disabled ? undefined : handelRating}>
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};
