import { useMemo, useReducer, useState } from "react";

type SupportedSearchParams = {
  [key: string]: string;
};

type setSearchParamsFn = (value: string) => void;

/**
 * const [{}, setSearchParam] = useUrlSearchParams()
 */
export function useUrlSearchParam(
  key: string,
  initialValue: string
): [string, setSearchParamsFn] {
  const locationSearch = window.location.search;

  const value = new URLSearchParams(locationSearch).get(key) || initialValue;

  const [, forceRerender] = useState<any>();

  const setSearchParams: setSearchParamsFn = (value) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, "", url);
    forceRerender({});
  };

  return [value, setSearchParams];
}
