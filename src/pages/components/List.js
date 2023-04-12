import { Grid, Typography } from "@mui/material";
import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom"
import useCharacters from "../../hooks/useCharacters"

import CardRick from "./CardRick";

const List = ({ postsPerPage }) => {
  const { page } = useParams();
  const [chars, fetchPosts] = useCharacters()
  useLayoutEffect(() => {
    fetchPosts(page, postsPerPage)
  }, [page, postsPerPage])

  if (chars) {
    return <Grid container spacing={2}>
      {chars.map((item) => <CardRick key={item.id} item={item}></CardRick>)}
    </Grid>
  }

  return <Typography variant="body1">Loading...</Typography>

}
export default List