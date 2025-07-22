import React, { useState } from "react";

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const webFormData = new FormData();
    webFormData.append("access_key", "3f94046d-12be-4a04-be46-43b7dc19570b");
    webFormData.append("name", formData.name);
    webFormData.append("email", formData.email);
    webFormData.append("contact", formData.contact);
    webFormData.append("message", formData.message);

    setResult("Sending...");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: webFormData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Your message was sent successfully!");
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        contact: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
        setResult("");
      }, 3000);
    } else {
      setResult("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#1A3D63] text-white py-12 px-4 sm:px-8 md:px-16 lg:px-32 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto bg-white text-gray-900 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 relative">
        {/* ✅ Success Message */}
        {result && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow z-20 text-center w-fit ${
              submitted
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-yellow-100 border border-yellow-400 text-yellow-700"
            }`}
          >
            {result}
          </div>
        )}

        {/* ✅ Form Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#1A3D63]">
            Contact Us
          </h2>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1A3D63]"
              placeholder="Name"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1A3D63]"
              placeholder="Email"
              required
            />
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1A3D63]"
              placeholder="Contact"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
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

        {/* ✅ Contact Info Section */}
        <div className="flex-1 flex flex-col justify-center items-center bg-[#f5f7fa] rounded-xl p-6 shadow-inner text-center">
          <h3 className="text-xl font-semibold text-[#1A3D63] mb-2">
            PRITHIVIK CRACKERS
          </h3>
          <p className="mb-1">
            1/214, North Street,
            <br />
            Madathupatti, Sivakasi, Virudhunagar 626 128
          </p>
          <p className="mb-1">
            WhatsApp:{" "}
            <a
              href="tel:7604648644"
              className="text-blue-600 hover:underline font-semibold"
            >
              7604648644
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:prithivikcrackers@hotmail.com"
              className="text-blue-600 hover:underline font-semibold"
            >
              prithivikcrackers@hotmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
