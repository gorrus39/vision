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

import ruBlogTitle from "~/i18n/locales/ru/blog/1-title";
import enBlogTitle from "~/i18n/locales/en/blog/1-title";
import cnBlogTitle from "~/i18n/locales/cn/blog/1-title";

import ruBlogHotNews from "~/i18n/locales/ru/blog/2-hot-news";
import enBlogHotNews from "~/i18n/locales/en/blog/2-hot-news";
import cnBlogHotNews from "~/i18n/locales/cn/blog/2-hot-news";

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      header: enHeader,
      language: enLanguage,
      footer: enFooter,

      home: {
        title: enHomeTitle,
        vision: enHomeVision,
        top_projects: enHomeTopProjects,
        always_relevant: enHomeAlwaysRelevant,
        vision_blog: enHomeVisionBlog,
        faq: enHomeFaq,
      },

      blog: {
        title: enBlogTitle,
        hot_news: enBlogHotNews,
      },
    },
    ru: {
      header: ruHeader,
      language: ruLanguage,
      footer: ruFooter,

      home: {
        title: ruHomeTitle,
        vision: ruHomeVision,
        top_projects: ruHomeTopProjects,
        always_relevant: ruHomeAlwaysRelevant,
        vision_blog: ruHomeVisionBlog,
        faq: ruHomeFaq,
      },

      blog: {
        title: ruBlogTitle,
        hot_news: ruBlogHotNews,
      },
    },
    cn: {
      header: cnHeader,
      language: cnLanguage,
      footer: cnFooter,

      home: {
        title: cnHomeTitle,
        vision: cnHomeVision,
        top_projects: cnHomeTopProjects,
        always_relevant: cnHomeAlwaysRelevant,
        vision_blog: cnHomeVisionBlog,
        faq: cnHomeFaq,
      },

      blog: {
        title: cnBlogTitle,
        hot_news: cnBlogHotNews,
      },
    },
  },
}));
