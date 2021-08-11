import axios from "axios";

export default function useAxios(method) {
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
    try {
      let res = await axios(opts);
      return res;
    } catch (err) {
      return { error: "Something went wrong", success: false };
    }
  }
  return { callAPI };
}
