import { useLayoutEffect, useRef, useState } from 'react';
import { Box, Button, LinearProgress, TextField, Typography } from "@mui/material"

const Chat = ({ name }) => {

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(`${name} розкажи про себе`)
  const [progress, setProgress] = useState(null)
  const controller = useRef(new AbortController())

  const handleClick = () => {
    setProgress(<LinearProgress sx={{ margin: "16px 0" }} color="progress" />)

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
        setProgress(null)
        setAnswer(data)
      })
      .catch(err => {
        setProgress(null)
        if (err.name === "AbortError") {
          setAnswer(`the question to ${name} was cancelled`)
        } else {
          console.log('Помилка:', err);
        }
      });
  }

  useLayoutEffect(() => {
    if (progress) {
      controller.current.abort()
      controller.current = new AbortController()
    }
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