import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "../../lib/utils"

export const AnimatedCard = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
));
AnimatedCard.displayName = "AnimatedCard";

export const AnimatedButton = React.forwardRef(({ className, children, ...props }, ref) => (
  <motion.button
    ref={ref}
    className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background", className)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    {children}
  </motion.button>
));
AnimatedButton.displayName = "AnimatedButton";

export const AnimatedInput = React.forwardRef(({ className, ...props }, ref) => (
  <motion.input
    ref={ref}
    className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    {...props}
  />
));
AnimatedInput.displayName = "AnimatedInput";