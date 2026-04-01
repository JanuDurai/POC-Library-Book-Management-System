import { useState } from "react";

/* To update details to json server  */
function UpdateUserOrProduct() {
  const [data, setData] = useState();

  /*api call to update details to json server */
  async function updateData(url:string, details:any) {
    await fetch(url, {
      method: "PUT",
      body: details,
    }).then(async (res) => {
      const updatedData = await res.json();
      setData(updatedData);
    });
  }
  return { data, updateData };
}

export default UpdateUserOrProduct;