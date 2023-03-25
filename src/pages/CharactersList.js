import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"

import PaginationRounded from "./components/PaginationRounded"

const CharactersList = () => {
  const [postsPerPage, setPostsPerPage] = useState(8)
  const [total, setTotal] = useState(null)
  const count = useRef(null)
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams()

  useEffect(() => {
    let postsPerPageStor = localStorage.getItem("postsPerPage")
    if (postsPerPageStor) {
      postsPerPageStor = +postsPerPageStor
      setPostsPerPage(postsPerPageStor)
    }
    const pageStor = +localStorage.getItem("page")
    if (pageStor) {
      navigate(`/${pageStor}`)
    }

    fetch("https://rickandmortyapi.com/api/character/")
      .then(res => res.json())
      .then(data => {
        const total = data.info.count
        count.current = Math.ceil(total / (postsPerPageStor ?? postsPerPage))
        setTotal(total)
      })

  }, [])

  useEffect(() => {
    if (page) {
      localStorage.setItem("page", page)
    }
  }, [page])

  const inputHandler = (e) => {
    const val = +e.target.value
    if (val < 1 || val > 24) {
      return
    }
    localStorage.setItem("postsPerPage", val)
    count.current = Math.ceil(total / val)
    setPostsPerPage(val)
    if (+page > count.current) {
      navigate(`/${count.current}`)
    }
  }

  return (
    <>
      <div>Posts per page:
        <input
          value={postsPerPage}
          onChange={inputHandler}
          type="number">
        </input>
      </div>
      {location.pathname === '/' && <div>Select a page to display the characters</div>}
      {<Outlet context={postsPerPage} />}
      {count.current ? <PaginationRounded
        count={count.current} /> :
        <div>Loading...</div>
      }
    </>
  )
}
export default CharactersList