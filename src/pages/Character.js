import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Avatar, Box, Button, Container, IconButton, Typography } from "@mui/material"
import { ArrowBack, ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";

import Info from "./components/Info";

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
        onClick={() => { navigate("/") }}
      >go back</Button>
      <Box sx={{ maxWidth: 413, margin: "0 auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <IconButton onClick={prevHandler}><ArrowBackIosNew /></IconButton>
          <Avatar
            alt="character"
            src={person.image}
            sx={{
              width: "74%",
              height: "74%",
              border: "5px solid #F2F2F7",
              margin: "16px auto",
            }}
          />
          <IconButton onClick={nextHandler}><ArrowForwardIos /></IconButton>
        </Box>
        <Typography
          variant="h3"
          align="center"
          sx={{ marginBottom: "48px" }}
        >
          {person.name}
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ marginBottom: "58px", fontWeight: 500, color: "#8E8E93" }}
        >
          Informations
        </Typography>
        {dataList}
      </Box>
    </Container>
  )
}
export default Character