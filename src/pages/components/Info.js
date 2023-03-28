import { Box, Divider, Typography } from "@mui/material"

const Info = ({ type, val }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ textTransform: "capitalize", fontWeight: 700 }}>{type}</Typography>
      <Typography variant="subtitle2" sx={{ textTransform: "capitalize", color: "#6E798C" }}>{val}</Typography>
      <Divider sx={{ margin: "11px 0" }} />
    </Box>
  )
}
export default Info