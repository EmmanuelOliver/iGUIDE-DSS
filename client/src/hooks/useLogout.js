
import { useAuthContext } from '../hooks/useauthenticateContext'
import { useCounselingSessionsContext } from './usecounselingsessionContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchSessions} = useCounselingSessionsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchSessions({type: 'SET_COUNSELINGSESSION',  payload: null })
  }

  return { logout }
}
