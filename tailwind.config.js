/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
  "node_modules/flowbite-react/lib/esm/**/*.js",
  "./index.html",   
  "./client/**/*.{html,js,jsx,ts,tsx}",
  "./client/src/**/*.{html,js,jsx,ts,tsx}",
  "./node_modules/flowbite/**/*.js",
  "./client/node_modules/flowbite-react/lib/esm/**/*.js",],
  theme: {
    extend: {
      "animation": {
        "border-width": "border-width 3s infinite alternate"
      },
      "keyframes": {
        "border-width": {
          "from": {
            "width": "10px",
            "opacity": "0"
          },
          "to": {
            "width": "100px",
            "opacity": "1"
          }
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

