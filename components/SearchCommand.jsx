import useSearch from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
// import { P } from "@clerk/clerk-react/dist/controlComponents-DPxaqPME";

const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const [IsMounted, setIsMounted] = useState(false);
  const documents = useQuery(api.documents.getSearch);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onclose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id) => {
    router.push(`/documents/${id}`);
    onclose();
  };

  if (!IsMounted) {
    return null;
  }
  return (
    <CommandDialog open={isOpen} onOpenChange={onclose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Notion...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
        {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document._id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">{document.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
