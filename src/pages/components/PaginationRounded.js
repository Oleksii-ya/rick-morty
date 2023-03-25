import { Pagination, Stack } from '@mui/material';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PaginationRounded({ count }) {
  const navigate = useNavigate()
  const { page } = useParams()
  const startPage = useRef(+page)

  return (
    <Stack spacing={2}>
      <Pagination
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