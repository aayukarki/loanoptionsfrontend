import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../i18n-config";
// import Banner from "./components/Banner";
import Footer from "./components/Footer";
import FooterSection from "./components/FooterSection";
import Navbar from "./components/Navbar";
import { FALLBACK_SEO } from "@/app/utils/constants";
import { getPageBySlug } from "@/app/utils/get-page-by-slug";
import { headers } from "next/headers";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.footerCta",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  let homemeta = await getPageBySlug("home", params.lang);
  homemeta = homemeta.data[0].attributes.seo;
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: homemeta.metaTitle || metadata.metaTitle,
    description: homemeta.metaTitle || metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const {
    notificationBanner,
    navbar,
    footer,
    phoneNumber,
    headerText1,
    headerText2,
    headerUrl1,
    headerUrl2,
    headerButtonText,
    headerButtonUrl,
  } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data?.attributes.url
  );

  const pathname = headers().get("x-pathname") || "";
  const isPageRoute = pathname === "/application";

  return (
    <html lang={params.lang}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dns8eeo.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        {!isPageRoute && (
          <Navbar
            phoneNumber={phoneNumber}
            headerText1={headerText1}
            headerText2={headerText2}
            headerUrl1={headerUrl1}
            headerUrl2={headerUrl2}
            headerButtonText={headerButtonText}
            headerButtonUrl={headerButtonUrl}
            links={navbar.links}
            logoUrl={navbarLogoUrl}
            logoText={navbar.navbarLogo.logoText}
          />
        )}

        <main className="min-h-screen">{children}</main>
        {!isPageRoute && (
          <>
            {/* <Banner data={notificationBanner} /> */}
            <FooterSection
              footerCtaTitle={footer.footerCta.title}
              footerCtaSubTitle={footer.footerCta.subTitle}
              footerCtaDescription={footer.footerCta.description}
              footerCtaEntityName={footer.footerCta.entityName}
              footerCtaNzbn={footer.footerCta.nzbn}
              footerCtaFspn={footer.footerCta.fspn}
              socialLinks={footer.socialLinks}
            />
            <Footer
              logoUrl={footerLogoUrl}
              logoText={footer.footerLogo.logoText}
              menuLinks={footer.menuLinks}
              categoryLinks={footer.categories.data}
              legalLinks={footer.legalLinks}
              socialLinks={footer.socialLinks}
            />
          </>
        )}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
