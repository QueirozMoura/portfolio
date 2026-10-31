import { createContext, useContext } from 'react'
import type { FrameProfile, MotionMode } from './capabilities'

export interface MotionState {
  mode: MotionMode
  profile: FrameProfile
  compact: boolean
}

export const MotionContext = createContext<MotionState>({ mode: 'static', profile: 't', compact: true })
export const useMotion = () => useContext(MotionContext)
