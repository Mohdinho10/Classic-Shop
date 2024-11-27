function NewsLetter() {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Subscribe to our newsletter to get exclusive offers, latest news and
        updates.
      </p>
      <form
        onSubmit={submitHandler}
        className="mx-auto my-6 flex w-full items-center gap-3 border pl-3 sm:w-1/2"
      >
        <input
          type="email"
          className="w-full flex-1 outline-none"
          placeholder="Enter your Email"
        />
        <button className="bg-black px-10 py-4 text-sm text-white">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsLetter;
