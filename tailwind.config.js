/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    // screens:{
    //   'sm': '240px',
    //   'md': '720px',
    //   'lg': '1080px',
    // },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
