"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { getStrapiMedia } from "@/app/utils/api-helpers";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

//images
import footerimg from "../../../public/footerimg.png";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
      height: number;
      width: number;
    };
  };
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "FACEBOOK":
      return <CgFacebook />;
    case "TWITTER":
      return <FaTwitter />;
    case "INSTAGRAM":
      return <CgInstagram />;
    case "LINKEDIN":
      return <FaLinkedin />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    default:
      return null;
  }
}

export default function FooterSection({
  footerCtaTitle,
  footerCtaSubTitle,
  footerCtaDescription,
  footerCtaEntityName,
  footerCtaNzbn,
  footerCtaFspn,
  socialLinks,
}: {
  footerCtaTitle: string;
  footerCtaSubTitle: string;
  footerCtaDescription: string;
  footerCtaEntityName: string;
  footerCtaNzbn: string;
  footerCtaFspn: string;
  socialLinks: Array<FooterLink>;
}) {
  return (
    <section className="bg-[#161529] text-white py-12 md:py-24 overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap xl:flex-nowrap items-center justify-between bg-primary rounded-lg p-8 md:p-12 mb-12">
          <div className="xl:w-7/12">
            <p className="text-6xl font-extrabold">
              {footerCtaTitle}
              <span className="text-secondary rounded-full">.</span>
            </p>
            <p className="text-xl font-bold">{footerCtaSubTitle}</p>
          </div>
          <div className="w-fit xl:w-auto mt-4 xl:mt-0">
            <a
              href="/application"
              className="block md:inline-block text-center bg-secondary text-white hover:bg-white hover:text-secondary transition-all text-md md:text-lg font-bold rounded-full px-4 md:px-12 py-4"
            >
              Try our FREE Loan Matching Technology
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-5 mb-12">
          <div className="w-fit order-2 md:order-1">
            <Image src={footerimg} alt="footerimg" />
          </div>
          <div className="w-fit order-1 md:order-2">
            <div className="flex gap-x-3">
              {socialLinks.map((link: FooterLink) => {
                return (
                  <a
                    key={link.id}
                    rel="noopener noreferrer"
                    href={link.url}
                    title={link.text}
                    target={link.newTab ? "_blank" : "_self"}
                    className="flex items-center justify-center w-10 h-10 border border-gray-800 hover:bg-secondary transition-all rounded-full"
                  >
                    <RenderSocialIcon social={link.social} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center -mx-4">
          <div className="md:w-2/3 px-4">
            <div className="text-xs leading-loose font-bold">
            <Markdown
                  children={footerCtaDescription}
                  remarkPlugins={[remarkGfm]}
                />
            </div>
          </div>
          <div className="md:w-1/3 px-4">
            <div className="font-bold">
              <p className="mb-0">Entity name - {footerCtaEntityName}</p>
              <p className="mb-0">NZBN: {footerCtaNzbn} </p>
              <p className="mb-0">
                Financial Service Provider Number: {footerCtaFspn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
