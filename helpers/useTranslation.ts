import nl from "@/translations/nl-NL.json";

export const useTranslation = () => {
  const t = (key: keyof typeof nl) => {
    if (nl[key]) return nl[key];

    throw new Error(`No translation found for ${key}`);
  };

  return {
    t,
  };
};
