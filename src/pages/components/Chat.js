import { useContext, useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, LinearProgress, TextField, Typography } from "@mui/material"
import { Campaign } from "@mui/icons-material";


import UserContext from '../../store/userContext';

const Chat = ({ name, img }) => {

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(`${name} розкажи про себе`)
  const [progress, setProgress] = useState(false)
  const controller = useRef(new AbortController())
  const { user } = useContext(UserContext)

  console.log({ user })

  const handleClick = () => {
    setProgress(true)
    fetch('https://rick-morty.fly.dev/generate-text', {
      signal: controller.current.signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: question,
        name
      })
    })
      .then(response => response.text())
      .then(data => {
        setProgress(false)
        setAnswer(data)
      })
      .catch(err => {
        setProgress(false)
        if (err.name === "AbortError") {
          setAnswer(`the question to ${name} was cancelled`)
        } else {
          console.log('Помилка:', err);
        }
      });
  }

  useEffect(() => {
    if (progress) {
      controller.current.abort()
      controller.current = new AbortController()
    }
    setAnswer("")
    setQuestion(`${name} розкажи про себе`)
    setProgress(false)
  }, [name])

  let talk = <Typography
    variant="h6"
    align="center"
    sx={{ marginBottom: "28px", fontWeight: 500, color: "#333333" }}
  >
    {`Chat with ${name}`}
  </Typography>

  if (user) {
    talk = <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "24px"
      }}>
      <Avatar
        src={user.picture}
        sx={{ width: 80, height: 80 }}
      />
      <Campaign
        fontSize="large"
        sx={{ margin: "0 20px" }} />
      <Avatar
        src={img}
        sx={{ width: 80, height: 80 }} />
    </Box>
  }

  return (
    <Box>
      {talk}
      <TextField
        onChange={(e) => { setQuestion(e.target.value) }}
        value={question}
        label="Ask a question"
        multiline
        sx={{ width: "100%", marginBottom: "18px" }}
      />
      <Button
        variant="outlined"
        onClick={handleClick}
        disabled={!!progress}
      >Send question</Button>
      <Box>
        {progress ? <LinearProgress sx={{ margin: "16px 0" }} color="progress" /> : <p>{answer}</p>}
      </Box>
    </Box>
  )
}
export default Chat