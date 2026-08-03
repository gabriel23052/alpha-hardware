import { useFavoritesStore } from "@stores/useFavoritesStore";
import { useNavigate } from "react-router";

import { favorites } from "../../features/favorites";
import { useSessionStore } from "@stores/useSessionStore";
import { toastHandler } from "@utils/toastHandler";

import SVGFavorite from "@svg/favorite.svg?react";

import classes from "./ProductFavoriteButton.module.css";

type Props = {
  productId: string;
  mode: "default" | "inCard";
  classname?: string;
  saleOffset?: boolean;
};

const ProductFavoriteButton = ({
  productId,
  mode,
  saleOffset,
  classname,
}: Props) => {
  const isBlockedToEdit = useFavoritesStore((state) => state.isBlockedToEdit);
  const isLoggedIn = useSessionStore((state) => state.isLoggedIn);
  const favoritesIds = useFavoritesStore((state) => state.favorites);

  const navigate = useNavigate();

  const handleFavorite: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (isBlockedToEdit) return;
    if (!isLoggedIn) {
      toastHandler.fail("Você precisa estar logado");
      navigate("/auth/login");
      return;
    }
    if (favoritesIds.has(productId)) {
      favorites.removeProduct(productId);
      return;
    }
    favorites.addProduct(productId);
  };

  return (
    <button
      className={`${classes.button} ${classname || ""}`}
      title="Adicionar aos favoritos"
      onClick={handleFavorite}
      data-mode={mode}
      data-saleoffset={saleOffset || "false"}
    >
      <SVGFavorite
        aria-hidden="true"
        width={32}
        height={32}
        data-isfavorite={favoritesIds.has(productId)}
      />
    </button>
  );
};

export default ProductFavoriteButton;

