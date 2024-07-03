"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";

//images
import aiims from "../../../public/aiims_003.svg";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-violet-400 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Footer({
  legalLinks,
}: {
  legalLinks: Array<FooterLink>;
}) {
  return (
    <footer className="py-5 bg-[#0f0e1e] text-white">
      <div className="container">
        <div className="grid justify-center items-center lg:justify-between">
          <div className="flex flex-col md:flex-row justify-center items-center font-bold text-xs md:text-sm gap-y-3">
            <div className="flex text-center justify-center items-center gap-x-3 md:gap-x-4 md:mr-4">
              Copyright {new Date().getFullYear()} <span>|</span> LoanOptions.ai{" "}
              <span>|</span> All Rights Reserved{" "}
              <span className="hidden md:inline-block">|</span>
            </div>
            <ul className="flex items-center gap-x-4">
              {legalLinks.map((link: FooterLink, index: number) => (
                <li key={link.id} className="flex items-center">
                  <Link
                    href={link.url}
                    target="_blank"
                    className="text-white hover:text-secondary"
                  >
                    {link.text}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="ml-4">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            <Image src={aiims} alt="footerimg" />
          </div>
        </div>
      </div>
    </footer>
  );
}
