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
      const mobileKamertonWidth = "320";
      const desktopKamertonWidth = "1920";

      const subClasses = [
        { css: "fontSize", subClass: ".text" },
        { css: "width", subClass: ".w" },
        { css: "height", subClass: ".h" },
      ];
      const counter = 400;

      const utilities: { [key: string]: CSSRuleObject } = {};
      for (let i = 1; i <= counter; i++) {
        for (const { css, subClass } of subClasses) {
          utilities[`${subClass}-desc-${i}`] = {
            [css]: `calc(${i} / ${desktopKamertonWidth} * 100vw)`,
          };
          utilities[`${subClass}-mob-${i}`] = {
            [css]: `calc(${i} / ${mobileKamertonWidth} * 100vw)`,
          };
        }
      }

      addUtilities(utilities);
    }),
  ],

  content: [
    // "./pages/**/*.{vue,js,ts}", // Убедитесь, что эти пути правильные
    // "./components/**/*.{vue,js,ts}",
    // "./layouts/**/*.{vue,js,ts}", // Если у вас есть такие директории
    // другие пути, где вы используете классы Tailwind
  ],
};
