import { useState, useEffect } from "react";

/* To fetch all the user details from json-server */
function FetchUsers() {
  const [userDetails, setUserDetails] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const userUrl = `${apiUrl}/userDetails`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(userUrl);
      const data = await response.json();
      setUserDetails(data);
    };
    fetchData();
  }, [userUrl]);
  return userDetails;
}

export default FetchUsers;
