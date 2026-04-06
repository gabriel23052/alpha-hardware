import SVGGpu from "@svg/gpu.svg?react";
import SVGMotherBoard from "@svg/motherBoard.svg?react";
import SVGCpu from "@svg/cpu.svg?react";
import SVGRam from "@svg/ram.svg?react";
import SVGSsd from "@svg/ssd.svg?react";
import SVGHdd from "@svg/hdd.svg?react";
import SVGInstagram from "@svg/instagram.svg?react";
import SVGX from "@svg/x.svg?react";
import SVGFacebook from "@svg/facebook.svg?react";

const CATEGORIES = [
  { name: "gpu", label: "Placas de Vídeo", Svg: SVGGpu },
  { name: "moba", label: "Placas-mãe", Svg: SVGMotherBoard },
  { name: "cpu", label: "Processadores", Svg: SVGCpu },
  { name: "ram", label: "Memórias RAM", Svg: SVGRam },
  { name: "ssd", label: "SSD's", Svg: SVGSsd },
  { name: "hdd", label: "HD's", Svg: SVGHdd },
];

const SOCIAL_MEDIA = [
  {
    id: "@alpha.hardware",
    name: "instagram",
    link: "",
    background: "linear-gradient(#fec808 0%, #fd09d1 70%, #3c45db 100%)",
    Svg: SVGInstagram,
  },
  {
    id: "@AlphaHardware",
    name: "x",
    link: "",
    background: "#000000",
    Svg: SVGX,
  },
  {
    id: "Alpha Hardware",
    name: "facebook",
    link: "",
    background: "#0f92ee",
    Svg: SVGFacebook,
  },
];

// prettier-ignore
const TAGS_WITH_LEGENDS = {
  moba: [
    { legend: "Fabricante", values: ["Asus", "Gigabyte", "MSI", "ASRock", "Colorful"] },
    { legend: "Socket", values: ["AMD", "Intel"] },
    { legend: "Memória", values: ["DDR4", "DDR5"] },
  ],
  gpu: [
    { legend: "Plataforma", values: ["NVidia", "AMD"] },
    { legend: "Fabricante", values: ["Asus", "Gigabyte", "MSI", "Sapphire", "XFX", "Palit", "PCyes", "ASRock"] },
    { legend: "VRAM", values: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
  ],
  cpu: [
    { legend: "Fabricante", values: ["Intel", "AMD"] },
    { legend: "Socket", values: ["LGA1700", "LGA1200", "AM4", "AM5"] },
  ],
  ram: [
    { legend: "Fabricante", values: ["Kingston", "Rise Mode", "XPG", "Corsair", "Lexar"] },
    { legend: "Barramento", values: ["DDR3", "DDR4", "DDR5"] },
    { legend: "Capacidade", values: ["8GB", "16GB", "16GB (2x8GB)", "32GB (2x16GB)"] },
  ],
  ssd: [
    { legend: "Fabricante", values: ["Corsair", "Kingston", "Rise Mode", "Sandisk", "WD", "Husky", "Lexar", "Adata"] },
    { legend: "Capacidade", values: ["120GB", "128GB", "240GB", "256GB", "480GB", "500GB", "960GB", "1TB", "2TB", "4TB"] },
  ],
  hdd: [
    { legend: "Fabricante", values: ["WD", "Toshiba", "Seagate"] },
    { legend: "Tipo", values: ["Interno", "Externo"] },
    { legend: "Capacidade", values: ["1TB", "2TB", "4TB", "5TB", "6TB", "8TB", "16TB", "18TB", "22TB"] },
  ],
};

export { CATEGORIES, SOCIAL_MEDIA, TAGS_WITH_LEGENDS };
