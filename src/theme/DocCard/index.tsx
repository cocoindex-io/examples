import React, { type ReactNode } from 'react';
import { useDocById } from '@docusaurus/plugin-content-docs/client';
import type { Props } from '@theme/DocCard';
import { ImageCard } from '@site/src/components/ImageCard';

function CardLayout({
  href,
  image,
  title,
  description,
  tags,
}: {
  href: string;
  title: string;
  image?: string;
  description?: string;
  tags?: string[];
}): ReactNode {
  // ImageCard requires an image, so return null if no image
  if (!image) {
    return null;
  }

  return (
    <ImageCard
      link={href}
      imageLink={image}
      title={title}
      content={description}
      tags={tags}
    />
  );
}

export default function DocCard({ item }: Props): ReactNode {
  // Only render link cards, ignore categories
  if (item.type !== 'link') {
    return null;
  }
  // Pass image and render image on each card
  const image: string | undefined =
    typeof item?.customProps?.image === 'string'
      ? item.customProps.image
      : undefined;
  const doc = useDocById(item.docId ?? undefined);

  // Extract tags from customProps or doc metadata
  const tags: string[] | undefined =
    (item?.customProps?.tags as string[]) ||
    undefined;

  return (
    <CardLayout
      href={item.href}
      image={image}
      title={item.label}
      description={item.description ?? doc?.description}
      tags={tags}
    />
  );
}
