"use client";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function SearchProduct() {
  const [productName, setProductName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch suggestions when productName changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (productName.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/suggestions?query=${encodeURIComponent(
            productName
          )}`
        );
        const data = await res.json();
        setSuggestions(data.products || []);
      } catch (err) {
        console.error("Suggestion fetch failed:", err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [productName]);

  // Perform search and update URL query params
  function searchProduct() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", productName);
    router.push(`?${params.toString()}`);
    setSuggestions([]); // Close suggestions dropdown after search
  }

  // Clear input and reset
  function clearSearch() {
    setProductName("");
    setSuggestions([]);
    router.push(PRODUCTS_ROUTE);
  }

  // When user clicks a suggestion, select it and search
  function selectSuggestion(name) {
    setProductName(name);
    setSuggestions([]);
    searchProduct();
  }

  return (
    <div className="w-full mx-auto relative max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoIosSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          id="search-product"
          value={productName}
          className="block w-full px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search products..."
          onChange={(e) => setProductName(e.target.value)}
          autoComplete="off"
        />
        <button
          onClick={searchProduct}
          className="text-white absolute end-1.5 bottom-1.5 bg-primary hover:opacity-90 font-medium rounded-lg text-sm p-1"
          aria-label="Search">
          <IoIosSearch className="w-5 h-5 text-white" />
        </button>
        {productName && (
          <button
            onClick={clearSearch}
            className="absolute end-9 bottom-1.5 text-sm p-1"
            aria-label="Clear search">
            <IoClose className="w-5 h-5 text-primary" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-gray-700 dark:border-gray-600">
          {suggestions.map((product) => (
            <li
              key={product._id}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer dark:hover:bg-blue-600 dark:text-white"
              onClick={() => selectSuggestion(product.name)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") selectSuggestion(product.name);
              }}
              role="option"
              aria-selected={false}>
              {product.name}
            </li>
          ))}
        </ul>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 px-4 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:border-gray-600">
          Loading...
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
