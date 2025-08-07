"use client";
import Image from "next/image";
import { useState } from "react";

function ImagePreview({ imageUrls = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <div className="shrink-0 max-w-md lg:max-w-lg mx-auto flex justify-center">
        <Image
          className="w-auto md:h-96"
          src={imageUrls[currentIndex]}
          alt=""
          height={1000}
          width={1000}
        />
      </div>
      <div className="flex gap-3 justify-center py-8">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`border-2 border-gray-300 hover:border-gray-400 rounded-lg p-2 w-20 h-20 ${
              index == currentIndex && "border-gray-400"
            }`}
          >
            <Image
              src={url}
              alt=""
              className="object-cover w-full h-full rounded-md"
              height={500}
              width={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagePreview;
