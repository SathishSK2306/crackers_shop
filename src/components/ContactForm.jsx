import React from "react";

const ContactForm = () => (
  <div className="bg-[#1A3D63] text-white py-12 px-4 sm:px-8 md:px-16 lg:px-32 min-h-screen flex items-center justify-center">
    <div className="w-full max-w-3xl mx-auto bg-white text-gray-900 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1A3D63]">
          Contact Us
        </h2>
        <form className="grid gap-5">
          <input
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1A3D63]"
            placeholder="Name"
            required
          />
          <input
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1A3D63]"
            placeholder="Email"
            required
          />
          <input
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1A3D63]"
            placeholder="Contact"
            required
          />
          <textarea
            className="border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-[#1A3D63]"
            placeholder="Message"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#1A3D63] hover:bg-[#154067] text-white font-semibold py-3 px-6 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Contact Info Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#f5f7fa] rounded-xl p-6 shadow-inner">
        <h3 className="text-xl font-semibold text-[#1A3D63] mb-2 text-center">
          PRITHIVIK CRACKERS
        </h3>
        <p className="mb-1 text-center">
          1/214, North Street,
          <br />
          Madathupatti, Sivakasi, Virudhunagar 626 128
        </p>
        <p className="mb-1 text-center">
          WhatsApp: <span className="font-semibold">9751157780</span>
        </p>
        <p className="text-center">
          Email: <span className="font-semibold">prithivik@gmail.com</span>
        </p>
      </div>
    </div>
  </div>
);

export default ContactForm;
