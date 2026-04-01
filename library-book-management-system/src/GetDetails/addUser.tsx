import { useState } from "react";

/*To add details to json server */
function AddUser(): [any, (url: string, details: any) => Promise<any>] {
  const [data, setData] = useState();

  /*api call to add details to json server */
  async function addUser(url: string, details: any) {
    const fetchedData = await fetch(url, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const addedData = await fetchedData.json();
    setData(addedData);
    console.log(addedData);
    return addedData;
  }
  return [data, addUser];
}

export default AddUser;
