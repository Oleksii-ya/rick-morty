import { useContext, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google"
import { IconButton } from "@mui/material"
import { Google, Login } from '@mui/icons-material';

import UserContext from "../../store/userContext";

const Authorization = () => {
  const gToken = useRef(null)
  const { isLoading, fetchUser } = useContext(UserContext)

  const onSuccess = (token) => {
    gToken.current = token.access_token
    localStorage.setItem("gToken", token.access_token)
    localStorage.setItem("timeout", Date.now() + token.expires_in * 1000);
    fetchUser(token.access_token)
  }

  const login = useGoogleLogin({
    onSuccess,
    onError: () => {
      alert("Login Failed")
    }
  })

  return (
    <IconButton
      disabled={isLoading}
      sx={{ borderRadius: "4px" }}
      onClick={() => login()}>
      <Google fontSize="large" /><Login fontSize="large" />
    </IconButton>
  )
}
export default Authorization