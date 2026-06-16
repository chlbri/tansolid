/**
 * Properties for generating SEO meta tags.
 */
type Props = {
  /** The page title. */
  title: string;
  /** The description meta content. */
  description?: string;
  /** The URL of the og/twitter image. */
  image?: string;
  /** Keywords for search engines. */
  keywords?: string;
};

/**
 * Generates an array of SEO head tag descriptors.
 * @param props - SEO properties containing title, description, keywords, and image URL.
 * @returns Array of metadata properties.
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
