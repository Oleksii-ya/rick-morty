import { useCallback, useEffect, useState } from "react"
import UserContext from "./userContext"

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = useCallback((token) => {
    setIsLoading(true)
    fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        "Authorization": "Bearer" + token
      }
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false)
        setUser(data)
      })
      .catch(error => {
        setIsLoading(false)
        console.error("There was a problem with the fetch operation")
      })
  }, [])

  useEffect(() => {
    const timeout = localStorage.getItem("timeout")
    const gToken = localStorage.getItem("gToken")

    if (!timeout || !gToken) {
      setIsLoading(false)
      return
    }

    if (Date.now() > +timeout) {
      localStorage.removeItem("timeout")
      localStorage.removeItem("gToken")
      setIsLoading(false)
      return
    }

    fetchUser(gToken)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider