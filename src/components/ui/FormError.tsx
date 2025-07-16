// components/shared/form-error.tsx
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <p
      className={cn(
        "text-sm min-h-[1.25rem] transition-all duration-150",
        message ? "text-red-500" : "invisible"
      )}
    >
      {message || "placeholder"}
    </p>
  );
}
