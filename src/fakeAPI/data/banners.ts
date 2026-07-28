export type Banner = {
  id: string;
  link: string;
  alt: string;
  baseSrc: string;
  baseWidth: number;
  baseHeight: number;
  responsiveVersions: {
    width: number;
    height: number;
    src: string;
  }[];
};

const data: Banner[] = [
  {
    id: "BAN-1AF1AC",
    link: "/catalog?sale=SAL-15AFC6&saleName=Festival%20das%20Placas%20de%20Vídeo",
    baseSrc: "./img/banners/BAN-1AF1AC.jpg",
    baseWidth: 3840,
    baseHeight: 200,
    alt: "Festival das Placas de Vídeo",
    responsiveVersions: [
      {
        width: 768,
        height: 300,
        src: "./img/banners/BAN-1AF1AC-768px.jpg",
      },
      {
        width: 1366,
        height: 250,
        src: "./img/banners/BAN-1AF1AC-1366px.jpg",
      },
      {
        width: 1920,
        height: 200,
        src: "./img/banners/BAN-1AF1AC-1920px.jpg",
      },
    ],
  },
  {
    id: "BAN-54C86E",
    link: "/",
    baseSrc: "./img/banners/BAN-54C86E.jpg",
    baseWidth: 3840,
    baseHeight: 200,
    alt: "Publicidade: CBX Light PRO 500",
    responsiveVersions: [
      {
        width: 768,
        height: 400,
        src: "./img/banners/BAN-54C86E-768px.jpg",
      },
      {
        width: 1366,
        height: 300,
        src: "./img/banners/BAN-54C86E-1366px.jpg",
      },
      {
        width: 1920,
        height: 300,
        src: "./img/banners/BAN-54C86E-1920px.jpg",
      },
    ],
  },
] as const;

const bannersTable = {
  data,
};

export { bannersTable };
