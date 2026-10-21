import { parse } from "yaml";
import source from "../data/socials.yml?raw";

type Social = {
  name: string;
  handle?: string;
  url: string;
  icon?: string;
};

export const socials = parse(source) as Social[];

export const socialUrl = (name: string) => {
  const social = socials.find((item) => item.name === name);
  if (!social) {
    throw new Error(`No social link named "${name}" in socials.yml.`);
  }
  return social.url;
};
