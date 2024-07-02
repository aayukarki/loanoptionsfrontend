"use client";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

//images
import awardimg from "../../../../public/award.svg";
import star from "../../../../public/star.svg";
import phone from "../../../../public/phone.svg";
import burgermenu from "../../../../public/burgermenu.svg";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <header className="sticky top-0 z-20 bg-primary text-white py-3 xl:py-4 px-5">
      <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-between items-center">
        <Logo src={logoUrl}></Logo>
        <div className="flex">
          <Link
            href="#"
            className="hidden lg:flex items-center gap-3 font-semibold border-r border-r-light py-2 px-2 md:px-4 xl:px-7"
          >
            <div className="relative">
              {awardimg && (
                <Image
                  src={awardimg}
                  alt="award"
                  className=""
                  width={16}
                  height={16}
                  loading="eager"
                />
              )}
              <span className="h-[4px] w-[4px] bg-red-600 inline absolute top-0 end-0 rounded-full"></span>
            </div>
            <span>Award-Winning Business</span>
          </Link>
          <Link
            href="#"
            className="hidden md:flex items-center gap-3 font-semibold border-r border-r-light py-2 px-2 md:px-4 xl:px-7"
          >
            <div className="relative">
              {star && (
                <Image
                  src={star}
                  alt="star"
                  className=""
                  width={16}
                  height={16}
                  loading="eager"
                />
              )}
              <span className="h-[4px] w-[4px] bg-red-600 inline absolute top-0 end-0 rounded-full"></span>
            </div>
            <span>647 Google Reviews</span>
          </Link>
          <Link
            href="tel:1300 060 684"
            className="group flex items-center gap-3 font-semibold border-r border-r-light py-2 px-2 md:px-4 xl:px-7"
          >
            <div className="relative">
              {phone && (
                <Image
                  src={phone}
                  alt="phone"
                  className=""
                  width={16}
                  height={16}
                  loading="eager"
                />
              )}
              <span className="animate-ping absolute -top-[1px] -end-[1px] inline-flex h-[6px] w-[6px] rounded-full bg-red-800"></span>
              <span className="h-[4px] w-[4px] bg-red-600 inline absolute top-0 end-0 rounded-full"></span>
            </div>
            <span className="w-[116px] group-hover:hidden transition-all duration-500">
              Talk to a Human
            </span>
            <span className="w-[116px] hidden group-hover:inline transition-all duration-500">
              1300 060 684
            </span>
          </Link>
          <Link
            href="https://skynet.driveiq.com.au/"
            className="ms-2 md:ms-4 xl:ms-7 text-lg px-2 md:px-4 xl:px-6 py-2 rounded-full bg-secondary text-white hover:bg-white hover:text-secondary transition-all font-bold"
          >
            Become a Partner
          </Link>

          {/* <button className="flex items-center gap-3 ms-7 text-lg px-6 py-2 rounded-full border border-light text-white bg-light hover:bg-transparent transition-all duration-500 font-bold">
            <span>Explore</span>
            <div className="relative">
              {burgermenu && (
                <Image
                  src={burgermenu}
                  alt="burgermenu"
                  className=""
                  width={16}
                  height={16}
                  loading="eager"
                />
              )}
              <span className="h-[4px] w-[4px] bg-red-600 inline absolute top-0 end-0 rounded-full"></span>
            </div>
          </button> */}
        </div>

        {/* <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div> */}

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" />{" "}
          {/* Overlay */}
          <Dialog.Panel className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Strapi</span>
                {logoUrl && <img className="h-8 w-auto" src={logoUrl} alt="" />}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  {links.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        {/* <button
          className="p-4 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-7 w-7 text-gray-100" aria-hidden="true" />
        </button> */}
      </div>
    </header>
  );
}
