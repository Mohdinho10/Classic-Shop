import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader color="#77777" />
    </div>
  );
}

export default Loader;
