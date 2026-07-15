import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ProductCardMotionProps {
  children: ReactNode
  index: number
}

export default function ProductCardMotion({ children, index }: ProductCardMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] as const }}
    >
      {children}
    </motion.div>
  )
}