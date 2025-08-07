import Spinner from "@/components/Spinner";

function ProductByIdLoader() {
  return (
    <div className="py-20 flex justify-center">
      <Spinner className="w-16 h-16" />
    </div>
  );
}

export default ProductByIdLoader;
