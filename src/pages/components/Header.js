import { Avatar, Button, Container } from "@mui/material"
import logo from "../../images/rock-ava.JPG"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ marginBottom: "18px" }}>
      <header>
        <Button onClick={() => { navigate("/") }}>
          <Avatar
            sx={{ width: 68, height: 68 }}
            variant="rounded"
            src={logo} />
        </Button>
      </header>
    </Container>
  )
}
export default Header