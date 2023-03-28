import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardRick = ({ item }) => {
  const navigate = useNavigate();
  return (<Grid item xs={12} sm={6} md={3}>
    <Card>
      <CardActionArea onClick={() => { navigate(`/character/${item.id}`) }}>
        <CardMedia
          component="img"
          height="168"
          image={item.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            sx={{ fontWeight: 500, fontSize: "20px" }}
            variant="body1">
            {item.name}
          </Typography>
          <Typography
            sx={{ fontWeight: 400, fontSize: "14px" }}
            variant="body1">
            {item.species}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  )
}
export default CardRick