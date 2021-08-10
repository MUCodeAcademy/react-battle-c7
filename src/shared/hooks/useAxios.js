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
      opts = { ...opts, body: JSON.stringify(body) };
    }
    axios(opts)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return { response, error, loading };
  }
  return { callAPI };
}
