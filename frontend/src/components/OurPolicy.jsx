import exchangeIcon from "../assets/images/exchange_icon.png";
import qualityIcon from "../assets/images/quality_icon.png";
import supportIcon from "../assets/images/support_img.png";

function OurPolicy() {
  return (
    <div className="flex flex-col justify-around gap-12 py-20 text-center text-sm text-gray-700 sm:gap-2 md:text-base lg:flex-row">
      <div>
        <img src={exchangeIcon} alt="" className="m-auto mb-5 w-12" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-700">We offer hassle free exchange policy</p>
      </div>

      <div>
        <img src={qualityIcon} alt="" className="m-auto mb-5 w-12" />
        <p className="font-semibold">Days Return Policy</p>
        <p className="text-gray-700">We provide 7 days free return policy</p>
      </div>

      <div>
        <img src={supportIcon} alt="" className="m-auto mb-5 w-12" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-700">We provide 24/7 customer support</p>
      </div>
    </div>
  );
}

export default OurPolicy;
