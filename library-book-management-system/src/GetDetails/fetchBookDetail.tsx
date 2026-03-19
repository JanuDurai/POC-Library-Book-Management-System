import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

/* To fetch the specific user detail with userid and return user detail */
function FetchBookDetail() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const bookUrl = `${apiUrl}/bookDetails`;
  const [bookDetail, setBookDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getBook = async () => {
      const foundBook = await fetch(`${bookUrl}/${id}`);
      const book = await foundBook.json();
      setBookDetail(book);
    };
    if (id) getBook();
  }, [id]);
  return bookDetail
}

export default FetchBookDetail;
