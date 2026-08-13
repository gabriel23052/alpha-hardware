import { useEffect, useState } from "react";

import type { TProduct } from "../../app.types";

import Favorite from "@components/product/card/Favorite";
import UnderlinedTitle from "@components/ui/UnderlinedTitle";
import ErrorMessage from "@components/ui/ErrorMessage";

import useFakeAPI from "@hooks/useFakeAPI";

import { favorites } from "@features/favorites";
import { sleep } from "@utils/sleep";

import SVGEmpty from "@svg/empty.svg?react";

import classes from "./Favorites.module.css";

const ANIMATION_TIME = 500;

const Favorites = () => {
  const api = useFakeAPI<TProduct["card"][]>("GET api/favorites");
  const [products, setProducts] = useState<TProduct["card"][]>([]);
  const [animated, setAnimated] = useState<string[]>([]);

  useEffect(() => {
    const effect = async () => {
      const response = await api.fetch({ pattern: "resolvedProduct" });
      if (response.success && response.data) {
        setProducts(response.data);
      }
    };
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFavorite = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    animate(productId);
    const wasRemoved = await favorites.removeProduct(productId);
    if (wasRemoved) return;
    if (animated.includes(productId)) {
      setAnimated((prev) => prev.filter((p) => p !== productId));
      return;
    }
    setProducts((prev) => [...prev, product]);
  };

  const animate = async (productId: string) => {
    setAnimated((prev) => [...prev, productId]);
    await sleep(ANIMATION_TIME);
    setAnimated((prev) => {
      if (!prev.includes(productId)) {
        return prev;
      }
      setProducts((products) => products.filter((p) => p.id !== productId));
      return prev.filter((p) => p !== productId);
    });
  };

  return (
    <section className={classes.container}>
      <UnderlinedTitle align="left" className={classes.title}>
        Favoritos
      </UnderlinedTitle>
      {api.error ? (
        <ErrorMessage>{api.error.message}</ErrorMessage>
      ) : api.loading ? (
        <div className={classes.spinner} title="Carregando"></div>
      ) : products.length > 0 ? (
        <ul>
          {products.map((p) => (
            <li key={p.id} data-animated={animated.includes(p.id)}>
              <Favorite product={p} remove={removeFavorite} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={classes.empty}>
          <SVGEmpty width={105} height={160} aria-hidden="true" />
          <p className="text-default dneutral-xlight">
            Você não adicionou nenhum produto aos favoritos ainda
          </p>
        </div>
      )}
    </section>
  );
};

export default Favorites;
