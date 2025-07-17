/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ovo: ["Ovo", "serif"],
      },
    },
  },
  plugins: [],
};

// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         ovo: ["Ovo", "serif"],
//       },
//     },
//   },
// };
