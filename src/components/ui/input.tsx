import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          `
          flex h-9 w-full
          bg-transparent
          px-0 py-0
          text-base
          placeholder:text-[#737373]
          outline-none
          ring-0
          focus:outline-none
          focus:ring-0
          focus-visible:outline-none
          focus-visible:ring-0
          disabled:cursor-not-allowed disabled:opacity-50
          md:text-sm
          `,
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
