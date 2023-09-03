module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily: {
        Pacifico : ["Pacifico", "Cursive"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
