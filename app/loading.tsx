import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

export default function loading() {
  return (
    <div>
      <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
        <Item variant="muted">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">
              Page loading is in progress...
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>
    </div>
  );
}
