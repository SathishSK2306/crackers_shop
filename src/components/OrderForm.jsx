import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OrderForm = ({ onSubmit, cart, total, discount, final }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const downloadPDF = () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Prithivik Crackers - Order Estimate", 14, 15);

    doc.setFontSize(12);
    doc.text(`Customer Name: ${formValues.name}`, 14, 25);
    doc.text(`Phone: ${formValues.phone}`, 14, 32);
    doc.text(`Address: ${formValues.address}`, 14, 39);

    doc.autoTable({
      startY: 45,
      head: [["S.No", "Product", "Price", "Qty", "Amount"]],
      body: cart.map((item, i) => [
        i + 1,
        item.name,
        `₹${item.price}`,
        item.quantity,
        `₹${item.price * item.quantity}`,
      ]),
    });

    const y = doc.lastAutoTable.finalY + 10;
    doc.text(`Total Products: ${cart.length}`, 14, y);
    doc.text(`Total Price: ₹${total.toFixed(2)}`, 14, y + 7);
    doc.text(`Discount: ₹${discount.toFixed(2)}`, 14, y + 14);
    doc.text(`Final Total: ₹${final.toFixed(2)}`, 14, y + 21);

    doc.text("Shop Address:", 14, y + 32);
    doc.text("Prithivik Crackers,", 14, y + 39);
    doc.text("123 Fireworks Lane, Sivakasi, Tamil Nadu", 14, y + 46);
    doc.text("Phone: +91 98765 43210", 14, y + 53);

    doc.save("prithivik_order_estimate.pdf");
  };

  return (
    <div className="w-full px-4">
      <div className="max-w-4xl mx-auto p-8 bg-[#F6FAFD] rounded border border-[#1A3D63] shadow">
        <h2 className="text-2xl mb-6 font-bold text-center text-[#1A3D63]">
          Place Your Details
        </h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input
            className="border p-3 rounded"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            className="border p-3 rounded"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            className="border p-3 rounded"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            placeholder="Whatsapp"
            required
          />
          <input
            className="border p-3 rounded"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <input
            className="border p-3 rounded"
            name="pincode"
            value={formValues.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            required
          />
          <input
            className="border p-3 rounded"
            name="city"
            value={formValues.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            className="border p-3 rounded"
            name="state"
            value={formValues.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
          <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="w-full bg-[#1A3D63] text-white py-3 rounded hover:bg-[#12314f]"
            >
              Place the Order
            </button>
            <button
              type="button"
              onClick={downloadPDF}
              className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
            >
              Download Estimate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
