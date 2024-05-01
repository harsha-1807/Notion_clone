"use client";

import { useMutation, useQuery } from "convex/react";
import { useEffect } from 'react';

import { Skeleton } from "@/components/ui/skeleton";
import Cover from "@/components/Cover";
import Toolbar from "@/components/Toolbar";
import Editor from "@/components/Editor";
import { api } from "@/convex/_generated/api";

const DocumentIdPage = ({ params }) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content) => {
    console.log(params.documentId,content);
    // console.log("done");
    update({
      id: params.documentId,
      content,
    });
  };
// onedChange()
  // useEffect(() => {
  //   if (document?.Content) {
  //     onedChange(document.Content);
  //   }
  // }, [document?.Content]);

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      <Editor onChange={(content) => onChange(content)} initialContent={document.content} editable={true} />

      </div>
    </div>
  );
};

export default DocumentIdPage;
