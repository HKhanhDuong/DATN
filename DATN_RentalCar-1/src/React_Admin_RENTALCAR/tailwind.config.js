/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Quét toàn bộ file React
    './src/views/**/*.{js,jsx}',  // Quét file trong thư mục views
  ],
  theme: {
    extend: {}, // Tuỳ chỉnh thêm nếu cần
  },
  plugins: [],
};
