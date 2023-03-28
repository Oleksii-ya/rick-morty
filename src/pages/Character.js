import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Avatar, Box, Button, Container, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material";

import Info from "./components/Info";

const Character = () => {
  const [person, setPerson] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate();

  const dataInfo = useMemo(() => ["gender", "status", "species", "origin", "type"], [])

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(json => {
        setPerson(json)
      })
  }, [])

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

  return (
    <Container maxWidth="lg">
      <Button
        variant="text"
        startIcon={<ArrowBack />}
        sx={{ fontWeight: 700, textTransform: "uppercase" }}
        onClick={() => { navigate(-1) }}
      >go back</Button>
      <Box sx={{ maxWidth: 413, margin: "0 auto" }}>
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