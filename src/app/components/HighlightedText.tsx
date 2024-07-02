import React from 'react'; // Add this line at the top of your file
interface HighlightedTextProps {
  text: string;
  tag: string;
  className?: string;
  color?: string;
}

export default function HighlightedText({
  text,
  tag: Tag,
  className,
  color,
}: HighlightedTextProps) {
  const tempText = text.split(/\s+/); // Improved splitting to handle multiple spaces
  const result: JSX.Element[] = tempText.map((word: string, index: number) => {
    if (word.includes("[")) {
      const highlight = word.replace("[", "").replace("]", "");
      return (
        <span key={index} className={color ? color : ""}>
          {highlight}
        </span>
      );
    }
    return <React.Fragment key={index}>{word} </React.Fragment>; // Use React.Fragment to avoid extra divs/spans
  });

  // You can use React.createElement to dynamically create the tag element
  return React.createElement(Tag, { className }, ...result);
}
