import ruHeader from "~/i18n/locales/ru/header";
import enHeader from "~/i18n/locales/en/header";
import cnHeader from "~/i18n/locales/cn/header";

import ruLanguage from "~/i18n/locales/ru/language";
import enLanguage from "~/i18n/locales/en/language";
import cnLanguage from "~/i18n/locales/cn/language";

import ruFooter from "~/i18n/locales/ru/footer";
import enFooter from "~/i18n/locales/en/footer";
import cnFooter from "~/i18n/locales/cn/footer";

import ruHomeTitle from "~/i18n/locales/ru/home/1-title";
import enHomeTitle from "~/i18n/locales/en/home/1-title";
import cnHomeTitle from "~/i18n/locales/cn/home/1-title";

import ruHomeVision from "~/i18n/locales/ru/home/2-vision";
import enHomeVision from "~/i18n/locales/en/home/2-vision";
import cnHomeVision from "~/i18n/locales/cn/home/2-vision";

import ruHomeTopProjects from "~/i18n/locales/ru/home/3-top-projects";
import enHomeTopProjects from "~/i18n/locales/en/home/3-top-projects";
import cnHomeTopProjects from "~/i18n/locales/cn/home/3-top-projects";

import ruHomeAlwaysRelevant from "~/i18n/locales/ru/home/4-always-relevant";
import enHomeAlwaysRelevant from "~/i18n/locales/en/home/4-always-relevant";
import cnHomeAlwaysRelevant from "~/i18n/locales/cn/home/4-always-relevant";

import ruHomeVisionBlog from "~/i18n/locales/ru/home/5-vision-blog";
import enHomeVisionBlog from "~/i18n/locales/en/home/5-vision-blog";
import cnHomeVisionBlog from "~/i18n/locales/cn/home/5-vision-blog";

import ruHomeFaq from "~/i18n/locales/ru/home/6-faq";
import enHomeFaq from "~/i18n/locales/en/home/6-faq";
import cnHomeFaq from "~/i18n/locales/cn/home/6-faq";

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      ...enHeader,
      ...enLanguage,
      ...enFooter,

      ...enHomeTitle,
      ...enHomeVision,
      ...enHomeTopProjects,
      ...enHomeAlwaysRelevant,
      ...enHomeVisionBlog,
      ...enHomeFaq,
    },
    ru: {
      ...ruHeader,
      ...ruLanguage,
      ...ruFooter,

      ...ruHomeTitle,
      ...ruHomeVision,
      ...ruHomeTopProjects,
      ...ruHomeAlwaysRelevant,
      ...ruHomeVisionBlog,
      ...ruHomeFaq,
    },
    cn: {
      ...cnHeader,
      ...cnLanguage,
      ...cnFooter,

      ...cnHomeTitle,
      ...cnHomeVision,
      ...cnHomeTopProjects,
      ...cnHomeAlwaysRelevant,
      ...cnHomeVisionBlog,
      ...cnHomeFaq,
    },
  },
}));
