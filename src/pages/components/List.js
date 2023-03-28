import { Grid, Typography } from "@mui/material";
import { useLayoutEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"

import CardRick from "./CardRick";

const List = () => {
  const postsPerPage = useOutletContext()
  const { page } = useParams();
  const [chars, doFetch] = useFetch()
  useLayoutEffect(() => {
    doFetch(page, postsPerPage)
  }, [page, postsPerPage])

  if (chars) {
    return <Grid container spacing={2}>
      {chars.map((item) => <CardRick key={item.id} item={item}></CardRick>)}
    </Grid>
  }

  return <Typography variant="body1">Loading...</Typography>

}
export default List