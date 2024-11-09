import stringToColor from '@/lib/stringToColor'
import { motion } from 'framer-motion'

function FollowPointer({ x, y, info }: { x: number; y: number; info: { name: string; avatar: string; email: string } }) {
  const color = stringToColor(info.email || '1')
  return (
    <motion.div className="h-4 w-4 rounded-full absolute z-50" style={{ top: y, left: x, pointerEvents: 'none' }} initial={{ scale: 1, opacity: 1 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
      <svg viewBox="0 0 100 100" className="fill-current text-white" style={{ background: color }}>
        <circle cx="50" cy="50" r="50" />
      </svg>
      <motion.div>{info.name || info.email}</motion.div>
    </motion.div>
  )
}
export default FollowPointer
