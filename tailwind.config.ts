import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import type { CSSRuleObject } from "tailwindcss/types/config";

export default <Partial<Config>>{
  theme: {
    extend: {},
  },
  plugins: [
    // добавление vw для 2-х резиновых экранов
    plugin(function ({ addUtilities }) {
      const pixelCounter = 700;

      const mobileKamertonWidth = 320;
      const desktopKamertonWidth = 1920;

      const subClasses = [
        { css: "fontSize", subClass: ".text" },
        { css: "width", subClass: ".w" },
        { css: "height", subClass: ".h" },
        { css: "gap", subClass: ".gap" },
        { css: "padding-left", subClass: ".ps" },
        { css: "padding-top", subClass: ".pt" },
        { css: "padding-right", subClass: ".pe" },
        { css: "top", subClass: ".top" },
        { css: "left", subClass: ".left" },
      ];

      const utilities: { [key: string]: CSSRuleObject } = {};
      for (let i = 1; i <= pixelCounter; i++) {
        const desktopAmount = `${((i / desktopKamertonWidth) * 100).toFixed(2)}vw`;
        const mobileAmount = `${((i / mobileKamertonWidth) * 100).toFixed(2)}vw`;

        for (const { css, subClass } of subClasses) {
          utilities[`${subClass}-D-${i}`] = { [css]: desktopAmount };
          utilities[`${subClass}-M-${i}`] = { [css]: mobileAmount };
        }
      }
      addUtilities(utilities);
    }),
  ],

  content: [],
};
