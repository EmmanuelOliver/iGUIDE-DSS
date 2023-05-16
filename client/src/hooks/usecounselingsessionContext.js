
import { CounselingSessionsContext } from "../context/counselingsessionContext"
import { useContext } from "react"

export const useCounselingSessionsContext= () => {
  const context = useContext(CounselingSessionsContext)

  if(!context) {
    throw Error('useCounselingSessionsContext must be used inside an CounselingSessionsContextProvider')
  }

  return context
}