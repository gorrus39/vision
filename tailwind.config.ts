import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { CSSRuleObject } from "tailwindcss/types/config";

export default <Partial<Config>>{
  theme: {
    extend: {
      // fontSize: {
      //   // d == 'desktop'  m == 'mobile'
      //   // (d | m)-px => vw
      //   "d-12": "0.625vw",
      //   "d-14": "0.729vw",
      //   "d-15": "0.781vw",
      //   "d-18": "0.938vw",
      //   "d-20": "1.042vw",
      //   "d-22": "1.146vw",
      //   "d-24": "1.25vw",
      //   "d-26": "1.354vw",
      //   "d-28": "1.458vw",
      //   "d-30": "1.563vw",
      //   "d-38": "1.979vw",
      //   "d-40": "2.083vw",
      //   "d-46": "2.396vw",
      //   "d-52": "2.708vw",
      //   "d-62": "3.229vw",
      //   "d-72": "3.75vw",
      //   "d-150": "7.813vw",
      //   "d-250": "13.021vw",
      //   "d-300": "15.625vw",
      // },
    },
  },
  plugins: [
    // добавление font-size - vw для 2-х резиновых экранов
    plugin(function ({ addUtilities }) {
      const utilities: { [key: string]: CSSRuleObject } = {};
      for (let i = 1; i <= 400; i++) {
        utilities[`.text-desc-${i}`] = {
          fontSize: `calc(${i} / 1920 * 100vw)`,
        };
        utilities[`.text-mob-${i}`] = {
          fontSize: `calc(${i} / 320 * 100vw)`,
        };
      }
      addUtilities(utilities);
    }),
  ],

  content: [
    "./pages/**/*.{vue,js,ts}", // Убедитесь, что эти пути правильные
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}", // Если у вас есть такие директории
    // другие пути, где вы используете классы Tailwind
  ],
};
