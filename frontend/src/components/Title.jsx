function Title({ text1, text2 }) {
  return (
    <div className="mb-6 flex items-center justify-center md:mb-8">
      <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-500 md:text-2xl lg:text-3xl">
        {text1} <span className="text-gray-700">{text2}</span>
        <span className="inline-block h-[2px] w-12 bg-gray-800 md:w-16"></span>
      </h2>
    </div>
  );
}

export default Title;
