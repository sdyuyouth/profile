import { createContext, useContext } from "react"
import type { PositionRelevance } from "@/data/idealPositions"

type PositionContextValue = {
  activePositionId: PositionRelevance
  setActivePositionId: (id: PositionRelevance) => void
}

export const PositionContext = createContext<PositionContextValue>({
  activePositionId: "vibe-coding",
  setActivePositionId: () => {},
})

export function useActivePosition() {
  return useContext(PositionContext)
}
