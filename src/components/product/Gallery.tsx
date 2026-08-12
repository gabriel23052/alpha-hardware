import React from "react";

import classes from "./Gallery.module.css";

const PRODUCT_IMG_WIDTH_HEIGHT = 320;
const PRODUCT_SELECT_IMG_WIDTH_HEIGHT = 74;

type Props = {
  media: IProductMedia;
  alt: string;
};

const Gallery = ({ media, alt }: Props) => {
  const [imageIndex, setImageIndex] = React.useState(0);

  return (
    <div className={classes.container}>
      <ul className={classes.selector} aria-label="Seletor de imagens">
        {media.images.map((image, index) => (
          <li key={image.small}>
            <button onClick={() => setImageIndex(index)}>
              <img
                src={`/img/products/${image.small}`}
                alt={alt}
                width={PRODUCT_SELECT_IMG_WIDTH_HEIGHT}
                height={PRODUCT_SELECT_IMG_WIDTH_HEIGHT}
              />
            </button>
          </li>
        ))}
      </ul>
      <div className={classes.imageContainer}>
        <img
          src={`/img/products/${media.images[imageIndex].medium}`}
          alt={alt}
          width={PRODUCT_IMG_WIDTH_HEIGHT}
          height={PRODUCT_IMG_WIDTH_HEIGHT}
        />
      </div>
    </div>
  );
};

export default Gallery;
