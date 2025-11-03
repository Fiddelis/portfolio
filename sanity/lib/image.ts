import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
export const urlFor = (src: any) => imageUrlBuilder(client).image(src);
