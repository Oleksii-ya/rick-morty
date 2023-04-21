import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Container } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PaginationRounded from "./components/PaginationRounded"
import List from "./components/List";

const CharactersList = ({ total }) => {
  const [postsPerPage, setPostsPerPage] = useState(8)
  const navigate = useNavigate();
  const { page } = useParams()
  const selectItems = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>)
  }, [])
  const count = useMemo(() => Math.ceil(total / (postsPerPage)), [total, postsPerPage])

  useEffect(() => {
    if (page > 1) {
      return
    }
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
    const countCh = Math.ceil(total / val)
    setPostsPerPage(val)
    if (+page > countCh) {
      navigate(`/${countCh}`)
    }
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <FormControl sx={{ width: "120px", margin: "12px 12px 12px 0" }}>
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
          <PaginationRounded count={count} />
        </Box>
        <List postsPerPage={postsPerPage} />
      </Container>
    </>
  )
}
export default CharactersList