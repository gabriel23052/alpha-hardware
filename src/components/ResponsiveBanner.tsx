import { Link } from "react-router";

import classes from "./styles/ResponsiveBanner.module.css";

interface ResponsiveBannerProps {
  link: string;
  baseSrc: string;
  responsiveImages: {
    width: number;
    height: number;
    src: string;
  }[];
  baseWidth: number;
  baseHeight: number;
  alt?: string;
}

const ResponsiveBanner = ({
  link,
  baseSrc,
  responsiveImages,
  alt,
  baseWidth,
  baseHeight,
}: ResponsiveBannerProps) => {
  function sortResponsiveImages() {
    return responsiveImages.sort((a, b) => a.width - b.width);
  }

  if (responsiveImages.length === 0) return null;
  return (
    <Link to={link} className={`${classes.responsiveBanner}`}>
      <picture>
        {sortResponsiveImages().map((responsiveImage) => (
          <source
            key={responsiveImage.width}
            media={`(max-width: ${responsiveImage.width}px)`}
            srcSet={responsiveImage.src}
            width={responsiveImage.width}
            height={responsiveImage.height}
          />
        ))}
        <img
          src={baseSrc}
          width={baseWidth}
          height={baseHeight}
          alt={alt || ""}
        />
      </picture>
    </Link>
  );
};

export default ResponsiveBanner;
