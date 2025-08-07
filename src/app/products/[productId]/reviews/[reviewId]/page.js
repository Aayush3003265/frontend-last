async function ReviewByIdPage({ params }) {
  const { productId, reviewId } = await params;

  if (parseInt(reviewId) > 100) {
    throw new Error(`Review with id: ${reviewId} not found`);
  }

  return (
    <div>
      Review of product id: {productId} with review id: {reviewId}
    </div>
  );
}

export default ReviewByIdPage;
