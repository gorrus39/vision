import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

export default <Partial<Config>>{
  theme: {
    extend: {
      animation: {
        "color-change": "colorChange 10s infinite",
      },
      keyframes: {
        colorChange: {
          "0%": { color: "white" },
          // "50%": { color: "green" },
          "100%": { color: "white" },
        },
      },
    },
  },
  plugins: [
    // // добавление vw для 2-х резиновых экранов
    // plugin(function ({ addUtilities }) {
    //   const startPixel = -500;
    //   const endPixel = 1500;
    //   const mobileKamertonWidth = 320;
    //   const desktopKamertonWidth = 1920;
    //   const subClasses = [
    //     { css: "fontSize", subClass: ".text" },
    //     { css: "lineHeight", subClass: ".leading" },
    //     { css: "width", subClass: ".w" },
    //     { css: "height", subClass: ".h" },
    //     { css: "gap", subClass: ".gap" },
    //     { css: "padding", subClass: ".p" },
    //     { css: "padding-left", subClass: ".ps" },
    //     { css: "padding-top", subClass: ".pt" },
    //     { css: "padding-bottom", subClass: ".pb" },
    //     { css: "padding-right", subClass: ".pe" },
    //     { css: "margin", subClass: ".m" },
    //     { css: "margin-right", subClass: ".me" },
    //     { css: "margin-left", subClass: ".ms" },
    //     { css: "margin-bottom", subClass: ".mb" },
    //     { css: "margin-top", subClass: ".mt" },
    //     { css: "top", subClass: ".top" },
    //     { css: "left", subClass: ".left" },
    //     { css: "right", subClass: ".right" },
    //     { css: "bottom", subClass: ".bottom" },
    //   ];
    //   const utilities: { [key: string]: CSSRuleObject } = {};
    //   for (let i = startPixel; i <= endPixel; i++) {
    //     const desktopAmount = `${((i / desktopKamertonWidth) * 100).toFixed(2)}vw`;
    //     const mobileAmount = `${((i / mobileKamertonWidth) * 100).toFixed(2)}vw`;
    //     for (const { css, subClass } of subClasses) {
    //       utilities[`${subClass}-D-${i}`] = { [css]: desktopAmount };
    //       utilities[`${subClass}-M-${i}`] = { [css]: mobileAmount };
    //     }
    //   }
    //   addUtilities(utilities);
    // }),
  ],

  content: [],
}
