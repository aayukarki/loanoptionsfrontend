"use client";

import HighlightedText from "./HighlightedText";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import React from "react";
import Slider from "react-slick";

// Images
import ms1 from "../../../public/ms1.png";
import ms2 from "../../../public/ms2.png";
import ms3 from "../../../public/ms3.png";
import ms4 from "../../../public/ms4.png";

import mss1 from "../../../public/mss1.png";
import mss2 from "../../../public/mss2.png";
import mss3 from "../../../public/mss3.png";
import mss4 from "../../../public/mss4.png";
import mss5 from "../../../public/mss5.png";
import mss6 from "../../../public/mss6.png";

const images = [ms1, ms2, ms3, ms4];
const sliderimages = [mss1, mss2, mss3, mss4, mss5, mss6];

const reviewsData = [
  { count: 788, image: ms1 },
  { count: 66, image: ms2 },
  { count: 39, image: ms3 },
  { count: 14, image: ms4 },
];

const sliderData = [
  {
    title: "Business builders",
    subtitle: "Expanding Your Business",
    sliderimage: mss1,
  },
  {
    title: "Balance The Grind",
    subtitle: "CEO Founder Interview",
    sliderimage: mss2,
  },
  {
    title: "Spotify Podcast",
    subtitle: "Talks Good and Bad Debt",
    sliderimage: mss3,
  },
  {
    title: "Busy Continent",
    subtitle: "Disruptor Launches Intelligent Loans",
    sliderimage: mss4,
  },
  {
    title: "Australian Fintech",
    subtitle: "Instant Finance Platform",
    sliderimage: mss5,
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface SuccessProps {
  data: {
    id: string;
    title: string;
    socialReviews: socialReviews[];
    partners: Partners[];
  };
}

interface Partners {
  id: string;
  title: string;
  subTitle: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface socialReviews {
  id: string;
  title: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

function Partners({ title, subTitle, picture }: Partners) {
  const imageUrl = getStrapiMedia(picture.data?.attributes.url);
  return (
    <div className="text-center md:text-left">
      {imageUrl && (
        <Image
          className="mb-4 md:mb-6 !inline-block"
          alt="alt text"
          height={picture.data?.attributes.height}
          width={picture.data?.attributes.width}
          src={imageUrl}
        />
      )}
      <p className="font-bold uppercase">{title}</p>
      <p className="text-gray-400">{subTitle}</p>
    </div>
  );
}

function SocialReviews({ title, picture }: socialReviews) {
  const imageUrl = getStrapiMedia(picture.data?.attributes.url);
  return (
    <div className="text-center md:text-left">
      {imageUrl && (
        <Image
          className="inline-block"          
          height={picture.data?.attributes.height}
          width={picture.data?.attributes.width}
          alt="alt text"
          src={imageUrl}
        />
      )}
      <div className="flex items-center justify-center sm:justify-start">
        <div className="mr-3 text-6xl font-bold mt-2">{title}</div>
        <div>
          <div className="font-bold uppercase">5 star reviews</div>
          <div className="flex items-center text-amber-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Success({ data }: SuccessProps) {
  return (
    <section className="bg-white py-10 lg:py-20 2xl:py-28 overflow-hidden">
      <div className="container">
        <HighlightedText
          text={data.title}
          tag="h2"
          className="text-5xl lg:text-8xl font-extrabold text-dark leading-none text-center xl:text-start mb-8 lg:mb-16"
        />
        {/* {JSON.stringify(data, null, 2)} */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.socialReviews?.map((socialReviews, index: number) => (
            <SocialReviews key={index} {...socialReviews} />
          ))}
        </div>
        <hr className="my-12" />
        <Slider {...settings}>
          {data.partners?.map((partners: Partners, index: number) => (
            <Partners key={index} {...partners} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
