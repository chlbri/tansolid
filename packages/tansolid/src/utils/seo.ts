/**
 * Properties for generating SEO meta tags.
 */
type Props = {
  /** The document title. */
  title: string;
  /** The document description. */
  description?: string;
  /** The URL of the preview image. */
  image?: string;
  /** Keywords associated with the page. */
  keywords?: string;
};

/**
 * Generates an array of SEO-related metadata objects for use in document heads.
 * @param props - The SEO options, including title, description, keywords, and image.
 * @returns An array of tag descriptors.
 */
export const seo = ({ title, description, keywords, image }: Props) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'og:image', content: image },
        ]
      : []),
  ];

  return tags;
};
