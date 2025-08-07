"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function LoadMoreProducts({ productCount }) {
  const [currentLimit, setCurrentLimit] = useState(5);

  const router = useRouter();

  function loadMore() {
    setCurrentLimit(currentLimit + 5);

    router.push(`?limit=${currentLimit + 5}`);
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={loadMore}
        disabled={productCount < currentLimit}
        className={`rounded px-4 py-2 flex items-center justify-center bg-primary hover:opacity-90 text-white disabled:opacity-80`}
      >
        Load More
      </button>
    </div>
  );
}

export default LoadMoreProducts;
