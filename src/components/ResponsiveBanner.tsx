import { Link } from "react-router";

import classes from "./ResponsiveBanner.module.css";

type ResponsiveBannerProps = { bannerData: IResponsiveBanner };

const ResponsiveBanner = ({ bannerData }: ResponsiveBannerProps) => {
  const { link, baseSrc, alt, baseWidth, baseHeight, responsiveImages } =
    bannerData;

  function sortResponsiveImages() {
    return responsiveImages.sort((a, b) => a.width - b.width);
  }

  if (responsiveImages.length === 0) return null;

  return (
    <Link to={link} className={`${classes.responsiveBanner}`}>
      <picture>
        {sortResponsiveImages().map((responsiveImage) => (
          <source
            key={responsiveImage.src}
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
