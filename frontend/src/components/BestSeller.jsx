import Title from "./Title";
import ProductItem from "./ProductItem";
import { useGetLatestBestsellersQuery } from "../slices/productApiSlice";
import Loader from "./Loader";

function BestSeller() {
  const {
    data: bestsellers,
    isLoading,
    // isError,
  } = useGetLatestBestsellersQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="my-10">
      <div className="py-8 text-center text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="m-auto w-3/4 text-xs text-gray-600 sm:text-sm md:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      {/* Products */}
      <div className="grid grid-cols-1 gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bestsellers?.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
