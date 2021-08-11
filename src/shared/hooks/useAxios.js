import React, { useState } from "react";
import axios from "axios";

export default function useAxios(method) {
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
    console.log(opts);
    try {
      let res = await axios(opts);
      return res;
    } catch (err) {
      return { error: "Something went wrong", success: false };
    }
  }
  return { callAPI };
}
