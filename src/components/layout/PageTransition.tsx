import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  enter: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' as const } },
  exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3, ease: 'easeIn' as const } },
};

interface Props { children: ReactNode; }

export default function PageTransition({ children }: Props) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}
