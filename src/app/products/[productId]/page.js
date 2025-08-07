import AddToCart from "@/components/products/AddToCart";
import Link from "next/link";
import { getProductById } from "@/api/products";
import ProductDescription from "@/components/products/Description";
import AddToFavorite from "@/components/products/AddToFavorite";
import ImagePreview from "@/components/products/Preview";
import BackButton from "@/components/BackButton";
import RelatedProducts from "@/components/products/RelatedProducts";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import FinalStars from "@/components/products/FinalStars";
import ProductRatingClient from "@/components/products/ProductRatingClient";
import CommentSectionClient from "@/components/products/CommentSectionClient";

async function getById(params) {
  const productId = (await params).productId;

  const response = await getProductById(productId).catch((error) => {
    throw new Error(error.response.data);
  });

  return response?.data;
}

export const generateMetadata = async ({ params }) => {
  const product = await getById(params);

  return {
    title: {
      absolute: product.name,
    },
    keywords: `${product?.brand},${product.category}`,
  };
};

async function ProductByIdPage({ params }) {
  const product = await getById(params);
  const productId = (await params).productId;
  // const userRating = product?.ratings?.find((r) => r.user === user?._id);
  const ratings = product?.ratings || [];
  const ratingsCount = ratings.length;
  const averageRating =
    ratingsCount > 0
      ? ratings.reduce((sum, r) => sum + r.value, 0) / ratingsCount
      : 0;

  return (
    <>
      <div className="pb-5">
        <BackButton />
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <ImagePreview imageUrls={product.imageUrls} />
        <div className="mt-6 sm:mt-8 lg:mt-0">
          <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
            In Stock
          </span>
          <h1 className="text-xl mt-2 font-semibold text-gray-900 sm:text-2xl dark:text-white">
            {product.name}
          </h1>
          <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              Rs. {product.price}
            </p>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              {/* starss */}
              <FinalStars productId={productId} />
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({averageRating.toFixed(1)})
              </p>
              <span className="text-sm font-medium leading-none text-gray-900 dark:text-white">
                {ratingsCount} Review{ratingsCount !== 1 && "s"}
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {product?.brand && (
              <Link
                href={`${PRODUCTS_ROUTE}?brands=${product?.brand}`}
                className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-5 py-1 rounded-sm dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
                {product.brand}
              </Link>
            )}
            <Link
              href={`${PRODUCTS_ROUTE}?category=${product?.category}`}
              className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-5 py-1 rounded-sm dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800">
              {product.category}
            </Link>
          </div>
          <div className="mt-6 gap-2 sm:gap-4 sm:items-center flex flex-col sm:flex-row sm:mt-8">
            <AddToFavorite />
            <AddToCart product={{ id: productId, ...product }} />
          </div>
          {/* //star */}
          <div>
            <ProductRatingClient
              productId={productId}
              ratings={product?.ratings}
            />
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-800" />
          <RelatedProducts
            category={product.category}
            currentProductId={productId}
          />
        </div>
      </div>
      <ProductDescription description={product?.description} />
      <CommentSectionClient productId={productId} ratings={product?.ratings} />
    </>
  );
}

export default ProductByIdPage;
