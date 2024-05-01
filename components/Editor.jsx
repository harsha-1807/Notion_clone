"use client";

import { useTheme } from "next-themes";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgeStore";

export default function Editor({ onChange, initialContent}) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file) => {
    const response = await edgestore.publicFiles.upload({
      folder: "uploads",
      access: "public",
      file,
    });

    return response.url;
  };

  const editor = useCreateBlockNote({
    
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
      <BlockNoteView
        editor={editor}
        // editable={true}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
  );
};


