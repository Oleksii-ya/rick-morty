import { useState } from "react"

const useCharacters = () => {
  const [chars, setChars] = useState(null)

  const fetchPosts = (page, postsPerPage) => {
    setChars(null)
    const arr = new Array(postsPerPage).fill().map((_, i) => (page - 1) * postsPerPage + i + 1)
    const strArr = JSON.stringify(arr)
    fetch(`https://rickandmortyapi.com/api/character/${strArr}`)
      .then(res => res.json())
      .then(data => setChars(data))
  }

  return [chars, fetchPosts]
}

export default useCharacters