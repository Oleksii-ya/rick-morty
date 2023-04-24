import { useContext } from "react";
import { Box, IconButton, Typography } from "@mui/material"
import { Google, Logout } from '@mui/icons-material';

import UserContext from "../../store/userContext";

const LogOut = () => {
  const { user, setUser } = useContext(UserContext)

  const out = () => {
    localStorage.removeItem("timeout")
    localStorage.removeItem("gToken")
    setUser(null)
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{ fontSize: "22px" }}
        variant='body1'>{`hello, ${user.given_name}`}</Typography>
      <IconButton
        sx={{ borderRadius: "4px" }}
        onClick={out}>
        <Google fontSize="large" /><Logout fontSize="large" />
      </IconButton>
    </Box>
  )
}
export default LogOut