import { useEffect, useState } from "react";
export default function useFetch(fetchFn) {
  const [data, setData] = useState();
  useEffect(() => { fetchFn().then(setData); }, [fetchFn]);
  return data;
}
