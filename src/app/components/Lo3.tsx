"use client";

import React, { useState } from "react";
import VideoModal from "./VideoModal";
import HighlightedText from "./HighlightedText";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { AiFillPlayCircle } from "react-icons/ai";

//images
import lo3title from "../../../public/lo_3_0_title.png";
import lo3banner from "../../../public/lo_3_0_banner.jpg";

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

interface Lo3Props {
  data: {
    id: string;
    title: string;
    description: string;
    videoId: string;
    banner: Picture;
    titleImage: Picture;
  };
}

export default function Lo3({ data }: Lo3Props) {
  const bannerImage = getStrapiMedia(data.banner.data.attributes.url);
  const titleImage = getStrapiMedia(data.titleImage.data.attributes.url);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="bg-primary text-white pt-80 pb-20 md:pb-32 xl:pb-40 relative text-center z-10 overflow-hidden">
      <div className="container">
        <div className="mb-12">
          {titleImage && (
            <Image
              src={titleImage}
              alt="titleImage"
              className=""
              width={data.titleImage.data.attributes.width}
              height={data.titleImage.data.attributes.height}
            />
          )}
        </div>
        <HighlightedText
          text={data.title}
          tag="h2"
          className="font-articulat-heavy text-5xl mb-12"
        />
        <div className="text-xl max-w-2xl mx-auto mb-12">
          <p>{data.description}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-lg border border-secondary bg-secondary hover:bg-opacity-75 text-white font-bold rounded-full px-12 py-4 transition-all duration-500 w-full md:w-fit"
          >
            See What's New
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center text-lg border border-white text-white hover:bg-white hover:text-primary font-bold rounded-full px-12 py-4 transition-all duration-500 w-full md:w-fit"
          >
            {" "}
            <AiFillPlayCircle className="size-6 mr-2" />
            Play Video
          </button>
        </div>
      </div>
      {isModalOpen && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoId={data.videoId}
        />
      )}
      <div className="absolute top-0 start-0 w-full h-full object-cover -z-10">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="bannerImage"
            className="w-full h-full object-cover"
            width={data.banner.data.attributes.width}
            height={data.banner.data.attributes.height}
          />
        )}
      </div>
    </section>
  );
}
