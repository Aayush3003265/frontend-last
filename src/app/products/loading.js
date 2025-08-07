function Loader() {
  return (
    <div className="w-full h-max rounded-xl animate-pulse duration-150 ease-in-out shadow-md">
      <div className="w-full h-36 bg-slate-300 rounded-t-xl"></div>
      <div className="pt-3 pb-5 px-5">
        <span className="bg-blue-200 text-primary text-xs font-medium me-2 px-10 py-0.5 rounded-sm "></span>
        <span className="bg-gray-200 text-gray-800 text-xs font-medium me-2 px-10 py-0.5 rounded-sm "></span>
        <h2 className="h-7 w-4/5 bg-gray-500 mt-3"></h2>

        <p className="my-4 bg-gray-400 w-1/3 h-5"></p>
        <button className="rounded shadow h-9 w-full bg-blue-300"></button>
      </div>
    </div>
  );
}

function ProductsLoader() {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-8">
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
      <Loader />
    </div>
  );
}

export default ProductsLoader;
