"use client";

import type React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "destructive";
}

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-14 w-14",
  lg: "h-16 w-16",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function FloatingActionButton({
  onClick,
  icon: Icon = Plus,
  className,
  size = "md",
  variant = "default",
}: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-24 right-4 z-40">
      <Button
        onClick={onClick}
        className={cn("rounded-full shadow-lg", sizeClasses[size], className)}
        variant={variant}
      >
        <Icon className={iconSizes[size]} />
      </Button>
    </div>
  );
}
