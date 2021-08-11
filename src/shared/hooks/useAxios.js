import React, { useState } from "react";
import axios from "axios";

export default function useAxios(method) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  async function callAPI(url, body = null) {
    let opts = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      url,
    };
    if (body) {
      opts = { ...opts, data: JSON.stringify(body) };
    }
    console.log(opts)
    await axios(opts)
      .then(async (res) => {
        await setResponse(res.data);
        console.log(response)
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        return {response, error, loading};
      });



  }
  return { callAPI };
}
