import React from "react";
import logo from "../assets/property-color-icon.svg";
import { IoCall, IoMail } from "react-icons/io5";
import { Mastercard, Visa, Paypal, Maestro } from "react-payment-logos/dist/flat";
const Footer = () => {
  return (
    <div className="mt-10 bg-gray-100 bottom-0">
      <hr />
      <div className="mt-8 mb-4 flex justify-evenly items-center ">
        <div>
          <img
            className="h-10 sm:h-20 hover:cursor-pointer"
            src={logo}
            onClick={() => navigate("/")}
          ></img>
        </div>

        <div>
          <h1 className="sm:text-lg mt-2 sm:mb-4 font-bold">Useful Links</h1>
          <p>About Us</p>
          <p>Terms and Conditions</p>
          <p>Return and Refund Poicy </p>
        </div>
        <div>
          <h1 className="sm:text-lg mt-2 sm:mb-4 font-bold">Contact</h1>
          <div className="flex gap-2 items-center">
            <IoCall color="gray" size={20} />
            <p>+91-755-598-2630</p>
          </div>
          <div className="flex gap-2 items-center">
            <IoMail color="gray" size={20} />
            <p>wanderwish@support.com</p>
          </div>
          <div className="flex gap-2 items-center">
            <Visa size={30} />
            <Mastercard size={30} />
                      <Paypal size={30} />
                      <Maestro size={30} />
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Footer;
