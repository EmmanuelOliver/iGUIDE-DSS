import { createContext, useReducer } from 'react'

export const CounselingSessionsContext = createContext()

export const counselingsessionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COUNSELINGSESSION':
      return { 
        counselingsessions: action.payload 
      }
    case 'CREATE_COUNSELINGSESSION':
      return { 
        counselingsessions: [action.payload, ...state.counselingsessions] 
      }
   case 'DELETE_COUNSELINGSESSION':
      return { 
        counselingsessions: state.counselingsessions.filter(cs => cs._id !== action.payload._id) 
      }
    case 'GET_COUNSELINGSESSION':
        return { 
          counselingsessions: state.counselingsessions.filter(cs => cs._id !== action.payload._id) 
        }
    default:
      return state
  }
}

export const CounselingSessionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(counselingsessionsReducer, { 
    counseling_sessions: null
  })
  
  return (
    <CounselingSessionsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CounselingSessionsContext.Provider>
  )
}