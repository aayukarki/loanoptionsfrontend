import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

//images
import globe from "../../../../public/globe.png";

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface LeftTextWithImageProps {
  data: {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    picture: Picture;
  };
}

export default function LeftTextWithImage({ data }: LeftTextWithImageProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="bg-[#5614BB] relative z-1 overflow-hidden pt-10 lg:pt-20 xl:py-32">
      <div className="container">
        <div className="row">
          <div className="xl:w-1/2">
            <article className="text-white relative text-center">
              <h2 className="text-5xl md:text-8xl font-extrabold leading-none mb-5 md:mb-10">
                {data.title}
                <span className="text-secondary">.</span>
              </h2>
              <div className="text-xl font-bold mb-10">
                <Markdown
                  children={data.description}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
              <a href={`${data.buttonUrl}`} className="block xl:inline-block bg-secondary text-white hover:bg-white hover:text-secondary transition-all text-lg font-bold rounded-full px-12 py-4">{data.buttonText}</a>
            </article>
          </div>
        </div>
      </div>
      <Image
        src={imgUrl || ""}
        alt={data.picture.data.attributes.alternativeText || "none provided"}
        className="block xl:absolute bottom-0 end-0 h-full w-full xl:w-auto"
        width={600}
        height={528}
      />
    </section>
  );
}
