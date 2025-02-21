import { useState } from "react";
import { useCreateProductMutation } from "../slices/productApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import download from "/download.png";
import ClipLoader from "react-spinners/ClipLoader";

function AddProductPage() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("topWear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const navigate = useNavigate();

  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  console.log(error);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Initialize FormData
    const formData = new FormData();

    // Append individual form fields
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("sizes", JSON.stringify(sizes)); // Send sizes as a JSON string
    formData.append("bestSeller", bestSeller);

    // Append selected images
    const imageFiles = [image1, image2, image3, image4];

    /* Append each selected photos to the FormData object */
    imageFiles.forEach((photo) => {
      formData.append("images", photo);
    });

    try {
      const result = await createProduct(formData).unwrap();

      if (result.error) {
        toast.error(result.error);
        console.log(result.error);
      } else {
        toast.success("Product Updated");
        navigate("/products");
      }

      // Reset form or show success message
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex w-full flex-col items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : download}
              alt=""
            />
            <input
              onClick={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              accept="image/*"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : download}
              alt=""
            />
            <input
              onClick={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              accept="image/*"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : download}
              alt=""
            />
            <input
              onClick={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              accept="image/*"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : download}
              alt=""
            />
            <input
              onClick={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              accept="image/*"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2 font-semibold">Product name</p>
        <input
          type="text"
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Enter Product name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2 font-semibold">Product description</p>
        <textarea
          className="h-[150px] w-full max-w-[500px] resize-none px-3 py-2"
          placeholder="Write content here..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      <div className="flex w-full flex-col gap-2 md:flex-row md:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onClick={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onClick={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="topWear">Top Wear</option>
            <option value="bottomWear">Bottom Wear</option>
            <option value="winterWear">Winter Wear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="Number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 md:w-[120px]"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"],
              )
            }
          >
            <p
              className={`${sizes.includes("S") ? "bg-gray-600 text-white" : "bg-slate-200"} cursor-pointer px-3 py-1`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"],
              )
            }
          >
            <p
              className={`${sizes.includes("M") ? "bg-gray-600 text-white" : "bg-slate-200"} cursor-pointer px-3 py-1`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"],
              )
            }
          >
            <p
              className={`${sizes.includes("L") ? "bg-gray-600 text-white" : "bg-slate-200"} cursor-pointer px-3 py-1`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"],
              )
            }
          >
            <p
              className={`${sizes.includes("XL") ? "bg-gray-600 text-white" : "bg-slate-200"} cursor-pointer px-3 py-1`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"],
              )
            }
          >
            <p
              className={`${sizes.includes("XXL") ? "bg-gray-600 text-white" : "bg-slate-200"} cursor-pointer px-3 py-1`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      <button className="mt-4 w-[150px] bg-gray-900 py-3 text-white">
        {isLoading ? <ClipLoader color="white" size={20} /> : "ADD PRODUCT"}
      </button>
    </form>
  );
}

export default AddProductPage;
