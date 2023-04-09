import { useEffect, useMemo, useRef, useState } from "react"
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { Container, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PaginationRounded from "./components/PaginationRounded"

const CharactersList = ({ total }) => {
  const [postsPerPage, setPostsPerPage] = useState(8)
  const count = useRef(Math.ceil(total / (postsPerPage)))
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = useParams()
  const selectItems = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>)
  }, [])

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

  const handleChange = (e) => {
    let val = +e.target.value
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
        <FormControl sx={{ width: "120px" }}>
          <InputLabel id="select-label">Posts per page</InputLabel>
          <Select
            labelId="select-label"
            value={postsPerPage}
            label="Posts per page"
            onChange={handleChange}
            MenuProps={{
              style: { maxHeight: "224px" }
            }}
          >
            {selectItems}
          </Select>
        </FormControl>
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