export const onRequest: PagesFunction = async ({ request }) => {
  const acceptLanguage = request.headers.get("Accept-Language") ?? "";

  const languages = acceptLanguage
    .split(",")
    .map((part) => {
      const [rawLocale, rawQ] = part.trim().split(";q=");

      return {
        locale: rawLocale.toLowerCase(),
        q: rawQ ? Number.parseFloat(rawQ) : 1,
      };
    })
    .filter(({ locale, q }) => locale && !Number.isNaN(q) && q > 0)
    .sort((a, b) => b.q - a.q);

  let locale = "en";

  for (const language of languages) {
    if (
      language.locale === "fr" ||
      language.locale.startsWith("fr-")
    ) {
      locale = "fr";
      break;
    }

    if (
      language.locale === "en" ||
      language.locale.startsWith("en-")
    ) {
      locale = "en";
      break;
    }
  }

  const url = new URL(request.url);
  url.pathname = `/${locale}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
      Vary: "Accept-Language",
    },
  });
};