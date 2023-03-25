import { useLayoutEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"

const List = () => {
  const postsPerPage = useOutletContext()
  const { page } = useParams();
  const [chars, doFetch] = useFetch()
  useLayoutEffect(() => {
    doFetch(page, postsPerPage)
  }, [page, postsPerPage])
  return (
    <>
      {chars ?
        chars.map((item) => <div key={item.id} >{item.name}</div>) :
        <div>Loading...</div>
      }
    </>
  )
}
export default List