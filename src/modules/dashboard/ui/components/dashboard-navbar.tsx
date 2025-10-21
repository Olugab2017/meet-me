"use client"

import {
  PanelLeftCloseIcon,
  PanelLeftIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "./dashboard-command";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; 

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  // ✅ Keyboard shortcut: ⌘ K / Ctrl K to toggle search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <TooltipProvider>
          {/* 🟩 Sidebar Toggle Button with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-9"
                variant="outline"
                onClick={toggleSidebar}
              >
                {(state === "collapsed" || isMobile) ? (
                  <PanelLeftIcon className="size-4" />
                ) : (
                  <PanelLeftCloseIcon className="size-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Toggle Sidebar
            </TooltipContent>
          </Tooltip>

          {/* 🔍 Search/Command Button with Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
                variant="outline"
                size="sm"
                onClick={() => setCommandOpen((open) => !open)}
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                Search...
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
                  <span>⌘</span>K
                </kbd>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Open Command Menu (⌘K)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </>
  );
};
