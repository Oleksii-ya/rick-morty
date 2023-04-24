import { Card, CardActionArea, CardMedia, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

import mainPhoto from "../images/rock-main.jpg"

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Card sx={{ maxWidth: "1200px", margin: "0 auto" }}>
        <CardActionArea
          sx={{ position: "relative" }}
          onClick={() => { navigate("/1") }}>
          <CardMedia
            component="img"
            image={mainPhoto}
            alt="rick"
          />
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: "30%",
              letterSpacing: "8px",
              fontSize: {
                xs: "26px",
                sm: "50px",
                md: "80px"
              }
            }}
            variant="h3"
            component="div">
            click me
          </Typography>
        </CardActionArea>
      </Card>
    </Container>
  )
}
export default Home