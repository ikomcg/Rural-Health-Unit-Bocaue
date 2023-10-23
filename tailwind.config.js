/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            blue: "#2b90f9",
            "light-yellow": "#fbf5ed",
            "light-black": "#1a1a1a",
         },
         height: {
            600: "600px",
            "webkit-fill-available": "-webkit-fill-available",
         },
         scale: {
            101: "1.01",
         },
         margin: {
            200: "200px",
         },
         lineHeight: {
            3: "3",
         },
      },
   },
   plugins: [],
};
