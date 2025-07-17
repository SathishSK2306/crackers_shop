import React from "react";

const CrackersTable = ({ data, cart, onAdd, onUpdate }) => {
  // Group products by category
  const grouped = data.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto mt-6 p-2">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#4A7FA7] text-white text-center">
          <tr>
            <th className="py-2 px-4 border">S.No</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Amount</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm bg-white">
          {Object.keys(grouped).map((category, catIdx) => (
            <React.Fragment key={category}>
              <tr className="bg-[#e9f5ff] text-lg font-semibold text-[#28587B]">
                <td colSpan="5" className="py-2 text-center border-y">
                  {category}
                </td>
              </tr>
              {grouped[category].map((item, index) => {
                const quantity =
                  cart.find((i) => i.id === item.id)?.quantity || 0;
                return (
                  <tr key={item.id} className="hover:bg-gray-50 border-b">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4 border">₹{item.price}</td>
                    <td className="py-2 px-4 border flex items-center justify-center gap-2">
                      <button
                        onClick={() => onUpdate(item.id, quantity - 1)}
                        className="px-2 py-1 bg-red-100 rounded hover:bg-red-200"
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => onAdd(item)}
                        className="px-2 py-1 bg-green-100 rounded hover:bg-green-200"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-2 px-4 border">
                      ₹{quantity * item.price}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrackersTable;
