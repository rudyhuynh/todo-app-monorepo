import flow from "lodash-es/flow";

const ENDPOINT = "http://localhost:3001";

declare type GlobalFetch = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

const defaultHeaders = {
  "Content-Type": "application/json",
  // Add more default headers here if needed.
};
const defaultHeadersFetch =
  (fetch: GlobalFetch) => (input: string, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      headers: {
        ...defaultHeaders,
        ...init?.headers,
      },
    });
  };

const endpointFetch =
  (fetch: GlobalFetch) => (input: string, init?: RequestInit) => {
    return fetch(`${ENDPOINT}${input}`, init);
  };

const jsonResponseFetch =
  (fetch: GlobalFetch) => async (input: string, init?: RequestInit) => {
    const response = await fetch(input, init);
    if (response.status === 200) {
      try {
        return await response.json();
      } catch (e) {
        console.warn(e);
      }
    }
    return response;
  };

export const fetch: (
  url: string,
  init?: RequestInit
) => Promise<Response | Object> = flow([
  defaultHeadersFetch,
  endpointFetch,
  jsonResponseFetch,
  // add more fetch enhancers here if needed
])(window.fetch);
