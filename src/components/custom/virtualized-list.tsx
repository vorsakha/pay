import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

export interface VirtualizedListProps<T> {
  items: T[];
  height?: number;
  itemHeight?: number;
  width?: number | string;
  renderItem: (
    item: T,
    index: number,
    style: React.CSSProperties,
  ) => React.ReactNode;
}

function VirtualizedList<T>({
  items,
  height = 200,
  itemHeight = 35,
  width = "100%",
  renderItem,
}: VirtualizedListProps<T>) {
  const Row = ({ index, style }: ListChildComponentProps) => {
    const item = items[index];
    return <div style={style}>{renderItem(item, index, style)}</div>;
  };

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width={width}
    >
      {Row}
    </List>
  );
}

export { VirtualizedList };
