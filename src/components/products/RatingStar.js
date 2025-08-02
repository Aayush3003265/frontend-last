"use client";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import { rateProduct } from "@/api/products";
// import { toast } from "react-toastify";

// import { useState } from "react";

// export default function RatingStar({
//   color = "#fcc419",
//   size = 24,
//   MaxRating = 5,
//   productId,
//   initialRating = 0,
//   alreadyRated = false,
// }) {
//   const [submitted, setSubmitted] = useState(alreadyRated);
//   const [loading, setLoading] = useState(false);
//   const [temprating, setTempRating] = useState(0);
//   const [rating, setRating] = useState(initialRating);

//   const ContainerStyle = {
//     display: "flex",
//     gap: 16,
//     alignItems: "center",
//   };

//   const StarContainerStyle = {
//     display: "flex",
//   };

//   const textStyle = {
//     lineHeight: 1,
//     margin: 0,
//     color: color,
//     fontSize: "24px",
//   };

//   const HandleRatingStar = (val) => {
//     if (!submitted) setTempRating(val);
//   };

//   const HandleResetRating = () => {
//     setTempRating(0);
//   };

//   const handleSubmit = async () => {
//     if (!rating || submitted) return;

//     try {
//       setLoading(true);
//       console.log("Submitting rating:", { productId, rating });
//       await rateProduct(productId, rating);
//       setSubmitted(true);
//       toast.success("✅ Rating submitted");
//     } catch (error) {
//       console.error(
//         "❌ Error submitting rating:",
//         error?.response?.data || error.message
//       );
//       toast.error("❌ Failed to submit rating");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={ContainerStyle}>
//       <div style={StarContainerStyle}>
//         {Array.from({ length: MaxRating }, (_, index) => (
//           <div key={index}>
//             <Star
//               full={temprating ? temprating >= index + 1 : rating >= index + 1}
//               color={color}
//               size={size}
//               setRating={() => HandleRatingStar(index + 1)}
//               HandleResetRating={HandleResetRating}
//               handelRating={() => {
//                 if (!submitted) setRating(index + 1);
//               }}
//               disabled={submitted}
//             />
//           </div>
//         ))}
//       </div>

//       <p style={textStyle}>{temprating || rating || ""}</p>

//       {!submitted && (
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="mt-2 px-4 py-1 rounded bg-yellow-500 text-white disabled:opacity-50">
//           {loading ? "Submitting..." : "Submit Rating"}
//         </button>
//       )}

//       {submitted && (
//         <span className="text-green-600 text-sm ml-2 font-semibold">
//           ✔️ You rated this product {rating} star{rating > 1 ? "s" : ""}
//         </span>
//       )}
//     </div>
//   );
// }

// const Star = ({
//   color,
//   size,
//   setRating,
//   HandleResetRating,
//   full,
//   handelRating,
//   disabled,
// }) => {
//   const StarStyle = {
//     height: `${size}px`,
//     width: `${size}px`,
//     display: "block",
//     cursor: disabled ? "not-allowed" : "pointer",
//     opacity: disabled ? 0.6 : 1,
//   };

//   return (
//     <span
//       style={StarStyle}
//       onMouseEnter={disabled ? undefined : setRating}
//       onMouseLeave={disabled ? undefined : HandleResetRating}
//       onClick={disabled ? undefined : handelRating}>
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill={color}>
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke={color}>
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//           />
//         </svg>
//       )}
//     </span>
//   );
// };
// ("use client");
// export default function RatingStar({
//   color = "#fcc419",
//   size = 24,
//   MaxRating = 5,
//   productId,
//   initialRating = 0,
//   alreadyRated = false,
// }) {
//   const [submitted, setSubmitted] = useState(alreadyRated);
//   const [loading, setLoading] = useState(false);
//   const [temprating, setTempRating] = useState(0);
//   const [rating, setRating] = useState(initialRating);

//   const handleStarHover = (val) => {
//     if (!submitted) setTempRating(val);
//   };

//   const handleResetHover = () => {
//     setTempRating(0);
//   };

//   const handleClickStar = (val) => {
//     if (!submitted) setRating(val);
//   };

//   const handleSubmit = async () => {
//     if (!rating || submitted) return;

//     setLoading(true);
//     try {
//       await rateProduct(productId, rating);
//       setSubmitted(true);
//       toast.success("✅ Rating submitted");
//     } catch (error) {
//       toast.error("❌ Failed to submit rating");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <div className="flex">
//         {Array.from({ length: MaxRating }, (_, index) => {
//           const filled = temprating
//             ? temprating >= index + 1
//             : rating >= index + 1;
//           return (
//             <Star
//               key={index}
//               full={filled}
//               color={color}
//               size={size}
//               disabled={submitted}
//               onHover={() => handleStarHover(index + 1)}
//               onLeave={handleResetHover}
//               onClick={() => handleClickStar(index + 1)}
//             />
//           );
//         })}
//       </div>

//       <p className="text-xl font-medium text-yellow-500">
//         {temprating || rating || ""}
//       </p>

//       {!submitted ? (
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="mt-1 px-4 py-1 rounded bg-yellow-500 text-white disabled:opacity-50">
//           {loading ? "Submitting..." : "Submit Rating"}
//         </button>
//       ) : (
//         <span className="text-green-600 text-sm font-semibold">
//           ✔️ You rated this product {rating} star{rating > 1 ? "s" : ""}
//         </span>
//       )}
//     </div>
//   );
// }
// const Star = ({ full, color, size, disabled, onHover, onLeave, onClick }) => {
//   return (
//     <span
//       onMouseEnter={!disabled ? onHover : undefined}
//       onMouseLeave={!disabled ? onLeave : undefined}
//       onClick={!disabled ? onClick : undefined}
//       className={`cursor-pointer ${
//         disabled ? "opacity-50 cursor-default" : ""
//       }`}>
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill={color}
//           viewBox="0 0 20 20"
//           height={size}
//           width={size}>
//           <path d="M9.049 2.927c..." />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           stroke={color}
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           height={size}
//           width={size}>
//           <path d="M11.049 2.927c..." />
//         </svg>
//       )}
//     </span>
//   );
// };const Star = ({ full, color, size, disabled, onHover, onLeave, onClick }) => {
//   return (
//     <span
//       onMouseEnter={!disabled ? onHover : undefined}
//       onMouseLeave={!disabled ? onLeave : undefined}
//       onClick={!disabled ? onClick : undefined}
//       className={`cursor-pointer ${
//         disabled ? "opacity-50 cursor-default" : ""
//       }`}>
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill={color}
//           viewBox="0 0 20 20"
//           height={size}
//           width={size}>
//           <path d="M9.049 2.927c..." />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           stroke={color}
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           height={size}
//           width={size}>
//           <path d="M11.049 2.927c..." />
//         </svg>
//       )}
//     </span>
//   );
// };
// const Star = ({
//   color,
//   size,
//   setRating,
//   HandleResetRating,
//   full,
//   handelRating,
//   disabled,
// }) => {
//   const StarStyle = {
//     height: `${size}px`,
//     width: `${size}px`,
//     display: "block",
//     cursor: disabled ? "not-allowed" : "pointer",
//     opacity: disabled ? 0.6 : 1,
//   };

//   return (
//     <span
//       style={StarStyle}
//       onMouseEnter={disabled ? undefined : setRating}
//       onMouseLeave={disabled ? undefined : HandleResetRating}
//       onClick={disabled ? undefined : handelRating}>
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill={color}
//           height={size}
//           width={size}>
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke={color}
//           height={size}
//           width={size}>
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//           />
//         </svg>
//       )}
//     </span>
//   );
// };

// ("use client");

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

  const handleMouseEnter = (val) => {
    if (!submitted) setTempRating(val);
  };

  const handleMouseLeave = () => {
    setTempRating(0);
  };

  const handleSubmit = async () => {
    if (!rating || submitted) return;

    try {
      setLoading(true);
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
    <div className="flex items-center gap-4 mt-2">
      <div className="flex">
        {Array.from({ length: MaxRating }, (_, index) => (
          <Star
            key={index}
            full={temprating ? temprating >= index + 1 : rating >= index + 1}
            color={color}
            size={size}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (!submitted) setRating(index + 1);
            }}
            disabled={submitted}
          />
        ))}
      </div>

      <p
        className="text-xl font-medium"
        style={{ color: submitted ? "#22c55e" : color }}>
        {temprating || rating || ""}
      </p>

      {!submitted && !alreadyRated && (
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-1 bg-yellow-500 text-white rounded disabled:opacity-50">
          {loading ? "Submitting..." : "Submit Rating"}
        </button>
      )}

      {(submitted || alreadyRated) && (
        <span className="text-green-600 text-sm ml-2 font-semibold">
          ✔️ You rated this product {rating} star{rating > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

const Star = ({
  full,
  color,
  size,
  onMouseEnter,
  onMouseLeave,
  onClick,
  disabled,
}) => {
  const starStyle = {
    height: `${size}px`,
    width: `${size}px`,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.7 : 1,
  };

  return (
    <span
      style={starStyle}
      onMouseEnter={disabled ? undefined : onMouseEnter}
      onMouseLeave={disabled ? undefined : onMouseLeave}
      onClick={disabled ? undefined : onClick}>
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 
          1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 
          3.292c.3.921-.755 1.688-1.54 
          1.118l-2.8-2.034a1 1 0 00-1.175 
          0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
          1 0 00-.364-1.118L2.98 
          8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 
          00.951-.69l1.07-3.292z"
          />
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
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 
            00.95.69h4.915c.969 0 
            1.371 1.24.588 1.81l-3.976 
            2.888a1 1 0 00-.363 1.118l1.518 
            4.674c.3.922-.755 1.688-1.538 
            1.118l-3.976-2.888a1 1 0 00-1.176 
            0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 
            1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 
            1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
};
