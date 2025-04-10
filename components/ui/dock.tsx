"use client"

import {
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "framer-motion"
import { debounce } from "lodash"

import { cn } from "@/lib/utils"

const DOCK_HEIGHT = 128
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 100
const DEFAULT_PANEL_HEIGHT = 64

type DockProps = {
  children: React.ReactNode
  className?: string
  distance?: number
  panelHeight?: number
  magnification?: number
  spring?: SpringOptions
}
type DockItemProps = {
  className?: string
  children: React.ReactNode
}
type DockLabelProps = {
  className?: string
  children: React.ReactNode
}
type DockIconProps = {
  className?: string
  children: React.ReactNode
}

type DocContextType = {
  mouseX: MotionValue
  spring: SpringOptions
  magnification: number
  distance: number
}
type DockProviderProps = {
  children: React.ReactNode
  value: DocContextType
}

const DockContext = createContext<DocContextType | undefined>(undefined)

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>
}

function useDock() {
  const context = useContext(DockContext)
  if (!context) {
    throw new Error("useDock must be used within an DockProvider")
  }
  return context
}

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4)
  }, [magnification])

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  const handleMouseMove = useCallback(
    ({ pageX }: React.MouseEvent) => {
      isHovered.set(1)
      mouseX.set(pageX)
    },
    [isHovered, mouseX]
  )

  const handleMouseLeave = useCallback(() => {
    isHovered.set(0)
    mouseX.set(Infinity)
  }, [isHovered, mouseX])

  const containerStyle = useMemo(
    () => ({
      height: height,
      scrollbarWidth: "none",
    }),
    [height]
  )

  const innerStyle = useMemo(
    () => ({
      height: panelHeight,
    }),
    [panelHeight]
  )

  const providerValue = useMemo(
    () => ({
      mouseX,
      spring,
      distance,
      magnification,
    }),
    [mouseX, spring, distance, magnification]
  )

  return (
    <motion.div
      // @ts-ignore
      style={containerStyle}
      className="mx-10 flex max-w-full items-start overflow-x-auto"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "mx-auto flex w-fit gap-4 rounded-2xl bg-gradient-to-b from-background to-muted px-4",
          className
        )}
        style={innerStyle}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={providerValue}>{children}</DockProvider>
      </motion.div>
    </motion.div>
  )
}

function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { distance, magnification, mouseX, spring } = useDock()

  const isHovered = useMotionValue(0)

  const transformMouseDistance = useCallback((val: number) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - domRect.x - domRect.width / 2
  }, [])

  const mouseDistance = useTransform(mouseX, transformMouseDistance)

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  )

  const width = useSpring(widthTransform, spring)

  const handleHoverStart = useCallback(
    debounce(() => isHovered.set(1), 100),
    [isHovered]
  )

  const handleHoverEnd = useCallback(
    debounce(() => isHovered.set(0), 100),
    [isHovered]
  )

  const handleFocus = useCallback(() => isHovered.set(1), [isHovered])

  const handleBlur = useCallback(() => isHovered.set(0), [isHovered])

  const memoizedStyle = useMemo(() => ({ width }), [width])

  const memoizedClassName = useMemo(
    () =>
      cn(
        "relative inline-flex items-center justify-center bg-transparent",
        className
      ),
    [className]
  )

  const memoizedChildren = useMemo(
    () =>
      Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { width, isHovered })
      ),
    [children, width, isHovered]
  )

  return (
    <motion.div
      ref={ref}
      style={memoizedStyle}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={memoizedClassName}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {memoizedChildren}
    </motion.div>
  )
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>
  const isHovered = restProps["isHovered"] as MotionValue<number>
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1)
    })

    return () => unsubscribe()
  }, [isHovered])

  const memoizedContent = useMemo(
    () =>
      isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute -top-3 left-1/2 z-50 w-fit whitespace-pre rounded-md border border-muted bg-background px-2 py-0.5 text-xs text-primary shadow-md",
            className
          )}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      ),
    [isVisible, className, children]
  )

  return <AnimatePresence>{memoizedContent}</AnimatePresence>
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>
  const width = restProps["width"] as MotionValue<number>

  const widthTransform = useTransform(width, (val) => val / 2)

  const memoizedStyle = useMemo(
    () => ({ width: widthTransform }),
    [widthTransform]
  )

  return (
    <motion.div
      style={memoizedStyle}
      className={cn(
        "flex items-center justify-center bg-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export { Dock, DockIcon, DockItem, DockLabel }
