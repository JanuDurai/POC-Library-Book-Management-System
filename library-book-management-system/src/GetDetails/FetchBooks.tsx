import { useState, useEffect } from "react";

/* To fetch all the user details from json-server */
function FetchBooks() {
  const [bookDetails, setbookDetails] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const bookUrl = `${apiUrl}/bookDetails`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(bookUrl);
      const data = await response.json();
      setbookDetails(data);
    };
    fetchData();
  }, [bookUrl]);
  return bookDetails;
}

export default FetchBooks;
