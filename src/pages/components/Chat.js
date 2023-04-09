import { useLayoutEffect, useState } from 'react';
import { Box, Button, LinearProgress, TextField, Typography } from "@mui/material"

const Chat = ({ name }) => {

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(`${name} розкажи про себе`)
  const [progress, setProgress] = useState(null)

  const handleClick = () => {
    setProgress(<LinearProgress
      sx={{ margin: "16px 0" }}
      color="progress" />)
    fetch('https://rick-morty.fly.dev/generate-text', {
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
        if (progress !== null) {
          setProgress(null)
          setAnswer(data)
        }
      })
      .catch(error => {
        setProgress(null)
        console.error(error)
      });
  }

  useLayoutEffect(() => {
    setAnswer("")
    setQuestion(`${name} розкажи про себе`)
    setProgress(null)
  }, [name])

  return (
    <Box>
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: "28px", fontWeight: 500, color: "#333333" }}
      >
        {`Chat with ${name}`}
      </Typography>
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
        {progress ?? <p>{answer}</p>}
      </Box>
    </Box>
  )
}
export default Chat