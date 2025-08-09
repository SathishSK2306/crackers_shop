import React from "react";

const CrackersTable = ({ data, cart, onAdd, onUpdate }) => {
  // Group products by category (assumes each item has `category`)
  const grouped = data.reduce((acc, item) => {
    const cat = item.category ?? "Uncategorized";
    acc[cat] = acc[cat] || [];
    acc[cat].push(item);
    return acc;
  }, {});

  // helper to read cart quantity by product id (string)
  const getQuantity = (item) => {
    const id = String(item.s_no ?? item.id);
    const found = cart.find((c) => String(c.id) === id);
    return found?.quantity ?? 0;
  };

  return (
    <div className="overflow-x-auto mt-6 p-2">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-[#4A7FA7] text-white text-center">
          <tr>
            <th className="py-2 px-4 border">S.No</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Product</th>
            <th className="py-2 px-4 border">Actual Price</th>
            <th className="py-2 px-4 border">Offer Price</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Amount</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm bg-white">
          {Object.keys(grouped).map((category) => (
            <React.Fragment key={category}>
              {/* Category title row */}
              <tr className="bg-[#e9f5ff] text-lg font-semibold text-[#28587B]">
                <td colSpan="7" className="py-2 text-center border-y">
                  {category}
                </td>
              </tr>

              {grouped[category].map((item, index) => {
                // quantity from cart (cart stores normalized id)
                const quantity = getQuantity(item);
                const offerPrice =
                  parseFloat(
                    String(
                      item.offer_price ?? item.offerPrice ?? item.price ?? 0
                    ).replace(/[^0-9.-]+/g, "")
                  ) || 0;
                const actualPrice =
                  parseFloat(
                    String(item.actual_price ?? item.actualPrice ?? 0).replace(
                      /[^0-9.-]+/g,
                      ""
                    )
                  ) || 0;

                return (
                  <tr
                    key={String(item.s_no ?? item.id) + "-" + index}
                    className="hover:bg-gray-50 border-b"
                  >
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">
                      {item.category ?? "Uncategorized"}
                    </td>
                    <td className="py-2 px-4 border">
                      {item.product ?? item.name}
                    </td>
                    <td className="py-2 px-4 border text-gray-500 line-through">
                      ₹{actualPrice.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border font-semibold text-green-600">
                      ₹{offerPrice.toFixed(2)}
                    </td>

                    <td className="py-2 px-4 border flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          onUpdate(
                            item.s_no ?? item.id,
                            Math.max(quantity - 1, 0)
                          )
                        }
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
                      ₹{(offerPrice * quantity).toFixed(2)}
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
