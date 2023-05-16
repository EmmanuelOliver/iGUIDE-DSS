import { useEffect } from "react"
import { useCounselingSessionsContext } from "../hooks/usecounselingsessionContext.js"
import { useAuthContext } from "../hooks/useauthenticateContext"
import CounselingSessionDetails from "../components/counselingsessionDetails.js"
import CounselingSessionForms from "../components/counselingsessionForm.js"

const CounselingProper= () => {
    const {counselingsessions, dispatch} = useCounselingSessionsContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchSessions = async () => {
        const response = await fetch('/api/counseling_session', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'SET_COUNSELINGSESSION', payload: json})
        }
    }
    if (user) {
        fetchSessions()
      }
    }, [dispatch])

    return (
        <div className="counseling-sessions">
            <CounselingSessionForms/>
            <div className="">
                {counselingsessions && counselingsessions.map(counselingsession => (
                <CounselingSessionDetails counselingsession={counselingsession} key={counselingsession._id} />
              ))}
            </div>
      </div>
    )
}
export default CounselingProper