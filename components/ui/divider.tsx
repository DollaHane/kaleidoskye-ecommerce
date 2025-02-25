import * as React from "react"

import { cn } from "@/lib/utils"

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {}

function Divider({ className, ...props }: DividerProps) {
  return (
    <div
      className={cn(
        "h-px w-full bg-gradient-to-r from-background to-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Divider }
