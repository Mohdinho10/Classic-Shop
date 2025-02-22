import Title from "./Title";
import ProductItem from "./ProductItem";
import { useGetLatestCollectionsQuery } from "../slices/productApiSlice";
import Loader from "./Loader";

function LatestCollection() {
  const {
    data: latestProducts,
    isLoading,
    //  isError,
  } = useGetLatestCollectionsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="m-auto w-3/4 text-sm text-gray-600 md:text-base lg:text-xs">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      {/*Latest Products */}
      <div className="grid grid-cols-1 gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts?.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
