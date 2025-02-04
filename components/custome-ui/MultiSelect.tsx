"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { selectRowsFn } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Collection } from "mongoose";
import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[]

  if (value.length === 0) {
    selected = []
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[]
  }

  const selectables = collections.filter((collection) => !selected.includes(collection));

  return (
    <Command className="overflow-visible text-primary">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id} className="text-white">{collection.title}
          <Button className="ml-1 hover:text-red-700 bg-transparent hover:bg-transparent" onClick={() => onRemove(collection._id)}>
            <X className="w-3 h-3" />
          </Button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((collection) => (
              <CommandItem
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => 
                  {onChange(collection._id);
                  setInputValue("");
                  }}
                  className="hover:bg-grey-100 cursor-pointer"
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
