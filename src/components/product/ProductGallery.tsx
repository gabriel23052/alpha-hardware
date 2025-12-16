import React from "react";

import classes from "./ProductGallery.module.css";

const PRODUCT_IMG_WIDTH_HEIGHT = 320;
const PRODUCT_SELECT_IMG_WIDTH_HEIGHT = 74;

const ProductGallery = ({ media, alt }: { media: IMedia; alt: string }) => {
  const [imageIndex, setImageIndex] = React.useState(0);

  return (
    <div className={`${classes.productGallery}`}>
      <div className={`${classes.selector}`}>
        {media.images.map((image, index) => (
          <button key={image.small} onClick={() => setImageIndex(index)}>
            <img
              src={`/img/products/${image.small}`}
              alt={alt}
              width={PRODUCT_SELECT_IMG_WIDTH_HEIGHT}
              height={PRODUCT_SELECT_IMG_WIDTH_HEIGHT}
            />
          </button>
        ))}
      </div>
      <div className={`${classes.imageContainer}`}>
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

export default ProductGallery;
