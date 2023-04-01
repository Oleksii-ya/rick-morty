import { useState } from 'react';

const Test = () => {

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("")

  const handleClick = () => {
    fetch('https://rick-morty.fly.dev/generate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: question
      })
    })
      .then(response => response.text())
      .then(data => setAnswer(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <textarea
        onChange={(e) => { setQuestion(e.target.value) }}
        value={question}
        rows="4"
        cols="50" ></textarea>
      <button onClick={handleClick}>Send question</button>
      <p>{answer}</p>
    </div>
  )
}
export default Test