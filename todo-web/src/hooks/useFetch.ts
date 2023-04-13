import { useEffect, useRef, useState } from "react";

const ENDPOINT = "http://localhost:3001";

export function useFetch(
  url: string,
  // setState, dispatch(...)
  setResponseToState: (data: any) => void,
  cache = false
) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const cacheRef = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    let ignore = false;
    async function fetchTodos() {
      if (cache && cacheRef.current[url]) {
        setResponseToState(cacheRef.current[url]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`${ENDPOINT}${url}`);
        const data = await response.json();
        if (!ignore) {
          if (cache) cacheRef.current[url] = data;
          setResponseToState(data);
        }
        setErrorMessage("");
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
        console.error(e);
      }
      setIsLoading(false);
    }

    fetchTodos();
    return () => {
      ignore = true;
    };
  }, [url]);

  return { isLoading, errorMessage };
}
