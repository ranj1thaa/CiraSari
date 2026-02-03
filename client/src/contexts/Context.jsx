import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import api from '../utils/axios'
export const Context=createContext({
})

export const useContexts = () => useContext(Context);

const ContextProvider=({children})=>{
  const [user, setUser]=useState(null)
  const [loading, setLoading] = useState(true);

  const fetchUsr=async()=>{
    try{
      const res=await api.get('/auth/me')
      setUser(res.data.user)
    }catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchUsr()
  },[])

  const logout=async()=>{
    try{
      await api.post("/auth/logout")
    }catch (err) {
      console.error(err);
    }
    setUser(null)
  }
  return(
    <Context.Provider value={{user, setUser, loading, logout}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider