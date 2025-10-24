"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Bug } from "lucide-react"
import { cn } from "@/lib/utils"

interface BugPatternProps {
  width?: number
  height?: number
  className?: string
  glow?: boolean
  density?: "low" | "medium" | "high"
  [key: string]: unknown
}

// Only bug icons for clean pest pattern
const pestIcons = [Bug]

export function BugPattern({
  width = 50,
  height = 50,
  className,
  glow = false,
  density = "medium",
  ...props
}: BugPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Adjust spacing based on density and screen size
  const spacingMultiplier = density === "low" ? 1.5 : density === "high" ? 0.7 : 1
  
  // Responsive spacing - larger spacing on mobile for better performance
  const isMobile = dimensions.width < 768
  const responsiveMultiplier = isMobile ? 1.3 : 1
  
  const adjustedWidth = width * spacingMultiplier * responsiveMultiplier
  const adjustedHeight = height * spacingMultiplier * responsiveMultiplier

  const cols = Math.ceil(dimensions.width / adjustedWidth)
  const rows = Math.ceil(dimensions.height / adjustedHeight)

  // Reduce quantity slightly - show every other bug for cleaner look
  const totalBugs = cols * rows
  const reducedBugs = Math.ceil(totalBugs * 0.7) // Show 70% of bugs instead of all
  
  const bugs = Array.from({
    length: reducedBugs,
  }, (_, i) => {
    // Distribute bugs more evenly across the grid
    const actualIndex = Math.floor((i * totalBugs) / reducedBugs)
    const col = actualIndex % cols
    const row = Math.floor(actualIndex / cols)
    const iconIndex = 0 // Always use Bug icon
    const shouldAnimate = glow && i % 10 === 0 // Animate every 10th bug for better visibility while maintaining performance
    
    // Add some randomness to positioning for organic feel
    const offsetX = (Math.random() - 0.5) * 20
    const offsetY = (Math.random() - 0.5) * 20
    
    return {
      x: col * adjustedWidth + adjustedWidth / 2 + offsetX,
      y: row * adjustedHeight + adjustedHeight / 2 + offsetY,
      delay: Math.random() * 12,
      duration: Math.random() * 8 + 10, // Even slower, more elegant animations
      animate: shouldAnimate,
      rotation: Math.random() * 360,
      iconIndex,
      scale: 0.5 + Math.random() * 0.5, // More varied sizes for organic feel
      opacity: 0.5 + Math.random() * 0.4, // Increased base opacity from 0.3 to 0.5 for better visibility
    }
  })

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {bugs.map((bug, index) => {
        const IconComponent = Bug // Always use Bug icon
        
        return bug.animate ? (
          <motion.div
            key={`bug-animated-${index}`}
            className="absolute"
            style={{
              left: bug.x,
              top: bug.y,
              transform: `translate(-50%, -50%) rotate(${bug.rotation}deg) scale(${bug.scale})`,
            }}
            initial={{ 
              opacity: bug.opacity * 0.2, // Increased from 0.1 to 0.2
              scale: bug.scale * 0.4, // Increased from 0.3 to 0.4
              rotate: bug.rotation 
            }}
            animate={{
              opacity: [bug.opacity * 0.2, bug.opacity * 0.8, bug.opacity * 0.2], // Increased visibility range
              scale: [bug.scale * 0.8, bug.scale * 1.3, bug.scale * 0.8], // More visible scaling
              rotate: [bug.rotation, bug.rotation + 180, bug.rotation + 360],
            }}
            transition={{
              duration: bug.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bug.delay,
            }}
          >
            <div className="relative">
              {/* Modern glow effect with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-admin-primary/40 via-admin-secondary/40 to-admin-primary/40 rounded-full blur-md opacity-80 scale-150"></div>
              
              {/* Outer glow ring */}
              <div className="absolute inset-0 bg-current rounded-full blur-sm opacity-40 scale-125"></div>
              
              {/* Icon with modern styling */}
              <IconComponent 
                className="h-5 w-5 text-current relative z-10 drop-shadow-md" 
                strokeWidth={1.5}
              />
            </div>
          </motion.div>
        ) : (
          <div
            key={`bug-static-${index}`}
            className="absolute"
            style={{
              left: bug.x,
              top: bug.y,
              transform: `translate(-50%, -50%) rotate(${bug.rotation}deg) scale(${bug.scale})`,
              opacity: bug.opacity * 0.6, // Increased from 0.3 to 0.6 for better visibility
            }}
          >
            <IconComponent 
              className="h-3 w-3 text-current" // Increased from h-2.5 w-2.5 to h-3 w-3
              strokeWidth={1.2} // Increased stroke width for better visibility
            />
          </div>
        )
      })}
      
      {/* Modern overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-admin-primary/5 via-transparent to-admin-secondary/5 pointer-events-none"></div>
    </div>
  )
}