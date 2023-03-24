import { useEffect, useState } from "react"

export const useTimer = (time: number) => {
    const [remaining, setRemaining] = useState<number>(time)
    
    useEffect(() => {
        const timer = setInterval(() => setRemaining(val => {
          if (val <= 200) {
            clearInterval(timer)
            return 0
          }
          return val - 200
        }), 200)
        return () => clearInterval(timer)
    }, [])
    
      return { remaining, expired: remaining === 0 }
}