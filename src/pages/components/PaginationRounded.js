import { Pagination, Stack } from '@mui/material';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function PaginationRounded({ count }) {
  const navigate = useNavigate()
  const { page } = useParams()
  const startPage = useRef(+page)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack spacing={2}>
      <Pagination
        size={matches ? "small" : "medium"}
        defaultPage={startPage.current ? startPage.current : 0}
        count={count}
        variant="outlined"
        shape="rounded"
        page={page ? +page : 0}
        onChange={(e, page) => {
          navigate(`/${page}`)
        }
        }
      />
    </Stack>
  );
}