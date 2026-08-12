import { useState } from "react";
import { Link } from "react-router";

import SkeletonLoading from "@components/ui/SkeletonLoading";
import ErrorMessage from "@components/ui/ErrorMessage";

import classes from "./Banner.module.css";

type Props = {
  data: IBanner | undefined;
  loading: boolean;
  error: IFakeApiError | null;
};

const Banner = ({ data, loading, error }: Props) => {
  const [imageLoading, setImageLoading] = useState(true);

  const sortResponsiveImages = () => {
    return (data as IBanner).responsiveVersions.sort(
      (a, b) => a.width - b.width,
    );
  };

  return (
    <div className={classes.container}>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {loading && <SkeletonLoading className={classes.skeletonLoading} />}
      {data && (
        <Link to={data.link} className={classes.link}>
          {imageLoading && (
            <SkeletonLoading className={classes.skeletonLoadingImage} />
          )}
          <picture
            className={classes.banner}
            onLoad={() => {
              setImageLoading(false);
            }}
          >
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
              src={data.baseSrc}
              width={data.baseWidth}
              height={data.baseHeight}
              alt={data.alt || ""}
            />
          </picture>
        </Link>
      )}
    </div>
  );
};

export default Banner;
