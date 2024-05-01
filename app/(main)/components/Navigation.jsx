import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  Plus,
  PlusCircle,
  PlusCircleIcon,
  Search,
  Settings,
  Sidebar,
  Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./UserItem";
import Item from "./Item";
import useSearch from "@/hooks/use-search";
import useSettings from "@/hooks/use-settings";

import { toast } from "sonner";
import { create } from "@/convex/documents";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import DocumentList from "./DocumentList";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import TrashBox from "./TrashBox";
import Navbar2 from "./Navbar2";
// import Navbar from "./Navbar2";
// import Navbar from "";

const Navigation = () => {
  const router = useRouter()
  const search = useSearch();
  const settings = useSettings();
  const params = useParams();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:760px)");
  const create = useMutation(api.documents.create)

  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);

  const [isResetting, setisResetting] = useState(false);
  const [IsCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);



  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setisResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setisResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setisResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setisResetting(false), 300);
    }
  };

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>{
      router.push(`/documents/${documentId}`)
    });
    

  toast.promise(promise, {
    loading: "Creating a new note...",
    success: "New note created!",
    error: "Failed to create a new note.",
  });
  }


  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft />
        </div>
        
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch  onClick={search.onOpen}/>
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          {/* <Item label="New Page" icon={PlusCircle} onClick={OnCreate}/> */}
          <Item label="New Page" icon={PlusCircle} onClick={onCreate} />
        </div>
        <div className="mt-4">
          <DocumentList/>
          <Item label="Add a page" icon={Plus} onClick={onCreate} />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>

        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {params.documentId ? (
            <Navbar2 isCollapsed={IsCollapsed} onResetWidth={resetWidth} />
          ) : (
            <nav className="bg-transparent px-3 py-2 w-full">
              {IsCollapsed && (
                <MenuIcon
                  onClick={resetWidth}
                  role="button"
                  className="h-6 w-6 text-muted-foreground"
                />
              )}
            </nav>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
