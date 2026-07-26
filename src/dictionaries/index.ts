import "server-only";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  hu: () => import("./hu.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  if (locale !== "en" && locale !== "hu") locale = "en";
  return dictionaries[locale as "en" | "hu"]();
};
