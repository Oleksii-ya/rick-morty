import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Input, Typography } from '@mui/material';

import PaginationRounded from "./components/PaginationRounded"

const CharactersList = ({ total }) => {
  const [postsPerPage, setPostsPerPage] = useState(8)
  const count = useRef(Math.ceil(total / (postsPerPage)))
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams()

  useEffect(() => {
    const postsPerPageStor = +localStorage.getItem("postsPerPage")
    if (postsPerPageStor) {
      setPostsPerPage(postsPerPageStor)
    }
    const pageStor = +localStorage.getItem("page")
    if (pageStor) {
      navigate(`/${pageStor}`)
    }
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
      <Container maxWidth="lg">
        <Typography variant="body1" component="div">
          Posts per page:
          <Input
            value={postsPerPage}
            onChange={inputHandler}
            type="number"
            sx={{ marginLeft: "14px", maxWidth: "60px" }}
          />
        </Typography>
        {location.pathname === '/' &&
          <Typography variant="body1" sx={{ margin: "18px 0" }}>
            Select a page to display the characters
          </Typography>}
        {<Outlet context={postsPerPage} />}
        <PaginationRounded count={count.current} />
      </Container>
    </>
  )
}
export default CharactersList