import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Title from "../components/Title";
import { products } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import { useShop } from "../context/ShopContext";
import { useGetProductsQuery } from "../slices/productApiSlice";

function ProductsPage() {
  const { search } = useShop();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const { data, isLoading, isError } = useGetProductsQuery();
  console.log(data);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    const filterHandler = () => {
      let productsCopy = products.slice();

      if (search) {
        productsCopy = productsCopy.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        );
      }
      if (category.length > 0) {
        productsCopy = productsCopy.filter((item) =>
          category.includes(item.category),
        );
      }

      if (subCategory.length > 0) {
        productsCopy = productsCopy.filter((item) =>
          subCategory.includes(item.subCategory),
        );
      }

      setFilterProducts(productsCopy);
    };

    filterHandler();
  }, [subCategory, category, search]);

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    const sortProduct = () => {
      let productsCopy = products.slice(); // Create a copy of the products array

      switch (sortType) {
        case "low-high":
          // Sort products from low to high price
          setFilterProducts(productsCopy.sort((a, b) => a.price - b.price));
          break;

        case "high-low":
          // Sort products from high to low price
          setFilterProducts(productsCopy.sort((a, b) => b.price - a.price));
          break;

        default:
          setFilterProducts(productsCopy); // Default case: no sorting
      }
    };

    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col gap-1 border-t pt-10 sm:flex-row sm:gap-10">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 flex cursor-pointer items-center gap-1 text-xl"
        >
          FILTERS
          <MdKeyboardArrowRight
            className={`h-6 w-6 md:hidden ${showFilter ? "rotate-90" : ""} transition-all duration-75`}
          />
        </p>
        {/* CATEGORY FILTER */}
        <div
          className={`mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} md:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`my-5 mt-6 border border-gray-300 py-3 pl-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"topWear"}
                onChange={toggleSubCategory}
              />{" "}
              Top Wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"bottomWear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottom Wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 cursor-pointer"
                value={"winterWear"}
                onChange={toggleSubCategory}
              />{" "}
              Winter Wear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="mb-4 flex justify-between text-base md:text-2xl">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* Product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 px-2 text-sm"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Products */}
        <div className="grid grid-cols-1 gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.products?.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
