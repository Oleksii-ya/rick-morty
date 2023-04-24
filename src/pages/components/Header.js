import { useContext } from "react";
import { Avatar, Box, Button, Container } from "@mui/material"
import logo from "../../images/rock-ava.JPG"
import { useNavigate } from "react-router-dom";

import Authorization from "./Authorization";
import UserContext from "../../store/userContext";
import LogOut from "./LogOut";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)

  return (
    <Container maxWidth="lg" sx={{ marginBottom: "18px" }}>
      <Box
        component="header"
        sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => { navigate("/") }}>
          <Avatar
            sx={{ width: 68, height: 68 }}
            variant="rounded"
            src={logo} />
        </Button>
        {user ? <LogOut /> : <Authorization />}
      </Box>
    </Container>
  )
}
export default Header