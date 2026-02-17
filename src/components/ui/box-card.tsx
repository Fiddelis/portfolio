import * as React from "react"

import { cn } from "@/lib/utils"

const BoxCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden rounded-none border border-border/60 bg-background/90 text-card-foreground shadow-none",
      className
    )}
    {...props}
  />
)
)
BoxCard.displayName = "BoxCard"

const BoxCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
BoxCardHeader.displayName = "BoxCardHeader"

const BoxCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
BoxCardTitle.displayName = "BoxCardTitle"

const BoxCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
BoxCardDescription.displayName = "BoxCardDescription"

const BoxCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
BoxCardContent.displayName = "BoxCardContent"

const BoxCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
BoxCardFooter.displayName = "BoxCardFooter"

export {
  BoxCard,
  BoxCardHeader,
  BoxCardTitle,
  BoxCardDescription,
  BoxCardContent,
  BoxCardFooter,
}
