import { useEffect, useState } from "react";
import { products } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";

function RelatedProducts({ category, subCategory }) {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let related = products.slice();
      related = related.filter((product) => category === product.category);
      related = related.filter(
        (product) => subCategory === product.subCategory,
      );

      setRelatedProducts(related.slice(0, 5));
    }
  }, [category, subCategory]);

  return (
    <div className="my-24">
      <div className="py-2 text-center text-3xl">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      {/* Products */}
      <div className="grid grid-cols-1 gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
