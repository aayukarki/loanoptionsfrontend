"use client";

import React, { useState } from "react";
import VideoModal from "./VideoModal";
import HighlightedText from "./HighlightedText";
import Image from "next/image";

//images
import lo3title from "../../../../public/lo_3_0_title.png";
import lo3banner from "../../../../public/lo_3_0_banner.jpg";

interface Lo3Props {
  data: {
    id: string;
    title: string;
    description: string;
    videoId: string;
  };
}

export default function Lo3({ data }: Lo3Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="bg-primary text-white pt-80 pb-20 md:pb-32 xl:pb-40 relative text-center z-10 overflow-hidden">
      <div className="container">
        <div className="mb-12">
          {lo3title && (
            <Image
              src={lo3title}
              alt="lo3title"
              className=""
              width={1519}
              height={902}
              loading="eager"
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
          <button className="text-lg border border-secondary bg-secondary hover:bg-opacity-75 text-white font-bold rounded-full px-12 py-4 transition-all duration-500 w-full md:w-fit">
            See What's New
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-lg border border-white text-white hover:bg-white hover:text-primary font-bold rounded-full px-12 py-4 transition-all duration-500 w-full md:w-fit"
          >
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
        {lo3banner && (
          <Image
            src={lo3banner}
            alt="lo3banner"
            className="w-full h-full object-cover"
            width={1519}
            height={902}
            loading="eager"
          />
        )}
      </div>
    </section>
  );
}
