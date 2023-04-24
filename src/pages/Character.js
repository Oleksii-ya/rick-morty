import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Avatar, Box, Button, Container, Grid, IconButton, Typography } from "@mui/material"
import { ArrowBack, ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";

import Info from "./components/Info";
import Chat from "./components/Chat";

const Character = ({ total }) => {
  const [person, setPerson] = useState(null)
  const id = +useParams().id
  const navigate = useNavigate();

  const dataInfo = useMemo(() => ["gender", "status", "species", "origin", "type"], [])

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(json => {
        setPerson(json)
      })
  }, [id])

  if (!person) {
    return <Container maxWidth="lg">
      <Typography variant="body1">Loading...</Typography>
    </Container>
  }

  const dataList = dataInfo.map((item) => {
    let val = person[item]
    if (!val) {
      val = "Unknown"
    }
    if (item === "origin") {
      val = val.name
    }
    return < Info key={item} type={item} val={val} />
  })

  const prevHandler = () => {
    if (id > 1) {
      navigate(`/character/${id - 1}`)
    }
  }
  const nextHandler = () => {
    if (id < total) {
      navigate(`/character/${id + 1}`)
    }
  }

  return (
    <Container maxWidth="lg">
      <Button
        variant="text"
        startIcon={<ArrowBack />}
        sx={{ fontWeight: 700, textTransform: "uppercase" }}
        onClick={() => { navigate(-1) }}
      >go back</Button>
      <Box sx={{ maxWidth: 413, margin: "0 auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton onClick={prevHandler}><ArrowBackIosNew /></IconButton>
          <Avatar
            alt="character"
            src={person.image}
            sx={{
              width: "50%",
              height: "50%",
              border: "5px solid #F2F2F7",
              margin: "16px auto",
            }}
          />
          <IconButton onClick={nextHandler}><ArrowForwardIos /></IconButton>
        </Box>
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: "18px" }}
        >
          {person.name}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Typography
            variant="h6"
            align="center"
            sx={{ marginBottom: "28px", fontWeight: 500, color: "#333333" }}
          >
            Informations
          </Typography>
          {dataList}
        </Grid>
        <Grid item sm={8} xs={12}>
          <Chat name={person.name} img={person.image} />
        </Grid>
      </Grid>
    </Container>
  )
}
export default Character