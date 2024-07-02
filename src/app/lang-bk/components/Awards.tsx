"use client";

import HighlightedText from "./HighlightedText";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import React from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  variableWidth: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  touchThreshold: 1000,
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

interface AwardsProps {
  data: {
    id: string;
    title: string;
    description: string;
    award: Award[];
  };
}

interface Award {
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

function Award({ title, subTitle, picture }: Award) {
  const imageUrl = getStrapiMedia(picture.data?.attributes.url);
  return (
    <div className="flex items-center gap-x-5 w-[360px] px-3">
      <div className="flex-none">
        {imageUrl && (
          <Image
            className="inline-block"
            height={120}
            width={120}
            alt="alt text"
            src={imageUrl}
          />
        )}
      </div>
      <div className="flex-grow">
        <p className="uppercase text-gray-900 font-extrabold leading-none mb-2">
          {title}
        </p>
        <p className="text-gray-400 font-extrabold leading-none mb-0">
          {subTitle}
        </p>
      </div>
    </div>
  );
}

export default function Awards({ data }: AwardsProps) {
  return (
    <section className="bg-white py-10 lg:pt-20 xl:pt-28 overflow-hidden">
      <div className="container">
        <HighlightedText
          text="More Awards."
          tag="h2"
          className="text-5xl lg:text-8xl font-extrabold text-dark leading-none text-center xl:text-start mb-8 lg:mb-16"
        />
        <Slider className="inline-flex -mx-3" {...settings}>
          {data.award.map((award: Award, index: number) => (
            <Award key={index} {...award} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
