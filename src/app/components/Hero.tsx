"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";

// images
import robot3 from "../../../public/robot_3_0.png";
import lo3 from "../../../public/lo_3_0.png";
import car from "../../../public/car.png";
import equipment from "../../../public/w2.png";
import personal from "../../../public/w3.png";
import business from "../../../public/w4.png";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
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

interface HeroProps {
  data: {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);

  // State management for the multi-step form
  const [step, setStep] = useState(1);

  const [quote, setQuote] = useState({
    type: "CAR_LOAN",
    usage: "CONSUMER",
    amount: 50000,
    term: 5,
    countryCode: "NZ",
    sourceUrl: "https://loanoptions.ai",
    targetSystem: "SKYNET",
    externalPartnerId: "1960",
  });

  useEffect(() => {
    localStorage.setItem("quote", JSON.stringify(quote));
  }, [quote]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateQuote = (key: string, val: string | number) => {
    setQuote((prevQuote) => ({
      ...prevQuote,
      [key]: val,
    }));
  };

  const handleSubmit = () => {
    // console.log("Quote data:", quote);
    localStorage.setItem("quote", JSON.stringify(quote));
    if (typeof window !== "undefined") {
      window.location.href = "/application";
    }
  };

  return (
    <section className="bg-gradient-to-b from-primary to-[#5614BB] text-white py-12 overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap xl:flex-nowrap justify-center xl:justify-between gap-y-12 xl:gap-y-0 xl:gap-x-24">
          <div className="w-full">
            <div className="flex flex-col">
              <HighlightedText
                text={data.title}
                tag="p"
                className="font-extrabold text-5xl md:text-7xl xl:text-8xl leading-none mb-6 text-center xl:text-left"
                color="dark:text-violet-400"
              />
              <h1 className="leading-none mb-5 text-center xl:text-left">
                <HighlightedText
                  text={data.subTitle}
                  tag="span"
                  className="font-extrabold text-3xl md:text-5xl"
                  color="dark:text-violet-400"
                />
              </h1>
              <HighlightedText
                text={data.description}
                tag="p"
                className="text-lightpurple text-lg font-extrabold mb-12 text-center xl:text-left"
                color="dark:text-violet-400"
              />
              <div
                className="p-6 bg-white text-primary rounded-2xl loanwidget relative"
                id="loanwidgetwrap"
              >
                <div className="absolute top-0 end-0 -mt-6 me-6">
                  {lo3 && (
                    <Image
                      src={lo3}
                      alt="lo3"
                      className=""
                      width={148}
                      height={54}
                      loading="eager"
                    />
                  )}
                </div>
                {step === 1 && (
                  <>
                    <HighlightedText
                      text="What type of loan do you need?"
                      tag="p"
                      className="text-2xl md:text-4xl font-bold my-6"
                    />
                    <div className="flex flex-wrap md:flex-nowrap -m-2">
                      <div className="w-1/2 md:w-full p-2">
                        <button
                          onClick={() => {
                            updateQuote("type", "CAR_LOAN");
                            nextStep();
                          }}
                          className="w-full group text-center pt-3 md:pt-5 rounded-xl bg-opacity-25 hover:bg-opacity-100 hover:scale-105 transition-all duration-500 bg-lightpurple text-primary"
                        >
                          {car && (
                            <Image
                              src={car}
                              alt="car"
                              className="grayscale group-hover:grayscale-0 transition-all duration-500 inline-block"
                              width={144}
                              height={85}
                              loading="eager"
                            />
                          )}
                          <p className="font-bold mt-6">Car</p>
                        </button>
                      </div>
                      <div className="w-1/2 md:w-full p-2">
                        <button
                          onClick={() => {
                            updateQuote("type", "EQUIPMENT_LOAN");
                            setStep(3);
                          }}
                          className="w-full group text-center pt-3 md:pt-5 rounded-xl bg-opacity-25 hover:bg-opacity-100 hover:scale-105 transition-all duration-500 bg-lightpurple text-primary"
                        >
                          {equipment && (
                            <Image
                              src={equipment}
                              alt="equipment"
                              className="grayscale group-hover:grayscale-0 transition-all duration-500 inline-block"
                              width={144}
                              height={85}
                              loading="eager"
                            />
                          )}
                          <p className="font-bold mt-6">Equipment</p>
                        </button>
                      </div>
                      <div className="w-1/2 md:w-full p-2">
                        <button
                          onClick={() => {
                            updateQuote("type", "PERSONAL_LOAN");
                            setStep(3);
                          }}
                          className="w-full group text-center pt-3 md:pt-5 rounded-xl bg-opacity-25 hover:bg-opacity-100 hover:scale-105 transition-all duration-500 bg-lightpurple text-primary"
                        >
                          {personal && (
                            <Image
                              src={personal}
                              alt="personal"
                              className="grayscale group-hover:grayscale-0 transition-all duration-500 inline-block"
                              width={144}
                              height={85}
                              loading="eager"
                            />
                          )}
                          <p className="font-bold mt-6">Personal</p>
                        </button>
                      </div>
                      <div className="w-1/2 md:w-full p-2">
                        <button
                          onClick={() => {
                            updateQuote("type", "BUSINESS_LOAN");
                            setStep(3);
                          }}
                          className="w-full group text-center pt-3 md:pt-5 rounded-xl bg-opacity-25 hover:bg-opacity-100 hover:scale-105 transition-all duration-500 bg-lightpurple text-primary"
                        >
                          {business && (
                            <Image
                              src={business}
                              alt="business"
                              className="grayscale group-hover:grayscale-0 transition-all duration-500 inline-block"
                              width={144}
                              height={85}
                              loading="eager"
                            />
                          )}
                          <p className="font-bold mt-6">Business</p>
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {step === 2 && quote.type === "CAR_LOAN" && (
                  <>
                    <div className="flex justify-between items-center my-6">
                      <HighlightedText
                        text="Is it for consumer or commercial use?"
                        tag="p"
                        className="text-2xl md:text-4xl font-bold mb-0"
                      />
                      <button
                        onClick={() => {
                          updateQuote("usage", "CONSUMER");
                          prevStep();
                        }}
                        className="bg-primary/10 hover:bg-primary/30 py-2 px-3 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap -m-2">
                      <div className="w-1/2 md:w-1/4 p-2">
                        <button
                          onClick={() => {
                            updateQuote("usage", "CONSUMER");
                            nextStep();
                          }}
                          className="w-full group text-center pt-3 md:pt-5 rounded-xl bg-opacity-25 hover:bg-opacity-100 hover:scale-105 transition-all duration-500 bg-lightpurple text-primary"
                        >
                          {personal && (
                            <Image
                              src={personal}
                              alt="personal"
                              className="grayscale group-hover:grayscale-0 transition-all duration-500 inline-block"
                              width={144}
                              height={85}
                              loading="eager"
                            />
                          )}
                          <p className="font-bold mt-6">Consumer</p>
                        </button>
                      </div>
                      <div className="w-1/2 md:w-1/4 p-2">
                        <button
                          onClick={() => {
                            updateQuote("usage", "COMMERCIAL");
                            nextStep();
                          }}
                          className="w-full group text-center pt-3 md:pt-5 rounded-xl bg-opacity-25 hover:bg-opacity-100 hover:scale-105 transition-all duration-500 bg-lightpurple text-primary"
                        >
                          {business && (
                            <Image
                              src={business}
                              alt="business"
                              className="grayscale group-hover:grayscale-0 transition-all duration-500 inline-block"
                              width={144}
                              height={85}
                              loading="eager"
                            />
                          )}
                          <p className="font-bold mt-6">Commercial</p>
                        </button>
                      </div>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="flex justify-between items-center my-6">
                      <HighlightedText
                        text="How much do you want to borrow?"
                        tag="p"
                        className="text-2xl md:text-4xl font-bold mb-0"
                      />
                      <button
                        onClick={() => {
                          if (quote.type === "CAR_LOAN") {
                            setStep(2);
                          } else {
                            setStep(1);
                          }
                        }}
                        className="bg-primary/10 hover:bg-primary/30 py-2 px-3 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between my-8 gap-x-5">
                      <p className="text-4xl md:text-6xl text-gray-300 font-bold text-center mb-0">
                        ${quote.amount.toLocaleString()}
                      </p>
                      <button
                        onClick={nextStep}
                        className="bg-[#5614BB] text-white hover:bg-primary transition-all p-4 w-[115px] md:w-[210px] rounded-full text-xl font-bold"
                      >
                        Continue
                      </button>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="500000"
                      step="1000"
                      value={quote.amount}
                      onChange={(e) =>
                        updateQuote("amount", Number(e.target.value))
                      }
                      className="w-full mb-6"
                      style={{
                        background: `linear-gradient(to right, #5614bb ${
                          ((quote.amount - 5000) / 495000) * 100
                        }%, #D3D3D3 ${
                          ((quote.amount - 5000) / 495000) * 100
                        }%)`,
                        appearance: "none",
                        height: "25px",
                        borderRadius: "50rem",
                      }}
                    />
                  </>
                )}
                {step === 4 && (
                  <>
                    <div className="flex justify-between items-center my-6">
                      <HighlightedText
                        text="What's your preferred loan term?"
                        tag="p"
                        className="text-2xl md:text-4xl font-bold mb-0"
                      />
                      <button
                        onClick={prevStep}
                        className="bg-primary/10 hover:bg-primary/30 py-2 px-3 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-center my-8 gap-x-5">
                      <p className="text-4xl md:text-6xl text-gray-300 font-bold text-center mb-0">
                        {quote.term} years
                      </p>
                      <button
                        onClick={handleSubmit}
                        className="bg-[#5614BB] text-white hover:bg-primary transition-all py-4 p-4 w-[115px] md:w-[210px] rounded-full text-xl font-bold"
                      >
                        Submit
                      </button>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={quote.term}
                      onChange={(e) =>
                        updateQuote("term", Number(e.target.value))
                      }
                      className="w-full mb-6"
                      style={{
                        background: `linear-gradient(to right, #5614bb ${
                          ((quote.term - 1) / 6) * 100
                        }%, #D3D3D3 ${((quote.term - 1) / 6) * 100}%)`,
                        appearance: "none",
                        height: "25px",
                        borderRadius: "50rem",
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block xl:w-8/12">
            <div className="relative">
              <p className="font-caveat text-xl absolute uppercase text-center text-lightpurple font-bold italic max-w-[150px] top-[260px] tracking-wide -start-20 -rotate-12">
                <span className="animate-bounce absolute w-[140px]">
                  Kia ora! im ailo, the smartest robot ever
                </span>
              </p>
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt="robot3"
                  className=""
                  width={data.picture.data.attributes.width}
                  height={data.picture.data.attributes.height}
                  loading="eager"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
