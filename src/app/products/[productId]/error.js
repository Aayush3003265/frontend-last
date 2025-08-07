"use client";

function ProductByIdError({ error }) {
  return <div className="py-5 text-xl text-red-500">{error.message}</div>;
}

export default ProductByIdError;
