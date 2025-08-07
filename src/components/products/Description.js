"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useSelector } from "react-redux";

function ProductDescription({ description }) {
  const { theme } = useSelector((state) => state.userPreference);

  return (
    <div className="mt-10">
      <MarkdownPreview
        source={description}
        style={{
          background: "#00000000",
        }}
        wrapperElement={{
          "data-color-mode": theme,
        }}
      />
    </div>
  );
}

export default ProductDescription;
