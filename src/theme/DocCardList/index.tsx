import React, { type ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useCurrentSidebarCategory } from '@docusaurus/plugin-content-docs/client';
import BrowserOnly from '@docusaurus/BrowserOnly';
import DocCard from '@theme/DocCard';
import type { Props } from '@theme/DocCardList';
import { RadioCards } from '@site/src/components/RadioCards';
import { 
  FaDatabase, 
  FaProjectDiagram, 
  FaImages, 
  FaTable, 
  FaCubes, 
  FaMap,
  FaThLarge 
} from 'react-icons/fa';
import styles from './styles.module.css';

// List of tags as requested
const TAGS = [
  'vector-index',
  'knowledge-graph',
  'multi-modal',
  'structured-data-extraction',
  'custom-building-blocks',
  'data-mapping'
];

// Icon mapping for each tag
const TAG_ICONS: Record<string, ReactNode> = {
  'vector-index': <FaDatabase />,
  'knowledge-graph': <FaProjectDiagram />,
  'multi-modal': <FaImages />,
  'structured-data-extraction': <FaTable />,
  'custom-building-blocks': <FaCubes />,
  'data-mapping': <FaMap />,
};

export default function DocCardList(props: Props): ReactNode {
  const { items, className } = props;
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // If items not provided, get from current sidebar category
  if (!items) {
    const category = useCurrentSidebarCategory();
    return <DocCardList items={category.items} className={className} />;
  }

  // Filter items by selected tag if any
  const filteredItems = selectedTag
    ? items.filter(
      (item) =>
        Array.isArray(item?.customProps?.tags) &&
        item.customProps.tags.includes(selectedTag)
    )
    : items;

  // Handle value change - convert "" to null for "All Categories"
  const handleValueChange = (value: string) => {
    setSelectedTag(value === '' ? null : value);
  };

  // Convert selectedTag to string for RadioCards (null becomes "")
  const radioValue = selectedTag === null ? '' : selectedTag;

  return (
    <>
      <div className={styles.tagSelectorContainer}>
        <RadioCards.Root
          value={radioValue}
          onValueChange={handleValueChange}
          defaultValue=""
          columns={{ initial: "2", md: "3" }}
          gap="2"
          size="1"
          variant="surface"
        >
          <RadioCards.Item value="">
            <FaThLarge />
            All Categories
          </RadioCards.Item>
          {TAGS.map((tag) => (
            <RadioCards.Item key={tag} value={tag}>
              {TAG_ICONS[tag]}
              {tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
      </div>
      <section className={clsx(styles.cardGrid, className)}>
        <BrowserOnly>
          {() => {
            return filteredItems.map((item, index) => (
              <div key={index} className={styles.cardItem}>
                <DocCard item={item} />
              </div>
            ));
          }}
        </BrowserOnly>
      </section>
    </>
  );
}
