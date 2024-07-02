import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Email from "../components/Email";
import Lo3 from "../components/Lo3";
import Awards from "../components/Awards";
import Success from "../components/Success";
import LeftTextWithImage from "../components/LeftTextWithImage";
import CenterTextWithImage from "../components/CenterTextWithImage";

export function sectionRenderer(section: any, index: number) {
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.lo3":
      return <Lo3 key={index} data={section} />;
    case "sections.awards":
      return <Awards key={index} data={section} />;
    case "sections.success":
      return <Success key={index} data={section} />;
    case "sections.left-text-with-image":
      return <LeftTextWithImage key={index} data={section} />;
    case "sections.center-text-with-image":
      return <CenterTextWithImage key={index} data={section} />;
    default:
      return null;
  }
}
