import { useState } from "react";

export function useUrlSearchParam(
  key: string,
  initialValue: string
): [string, (newValue: string) => void] {
  const value =
    new URLSearchParams(window.location.search).get(key) || initialValue;

  const [, forceUpdate] = useState<any>();

  const setParamValue = (newValue: string) => {
    const url = new URL(window.location.toString());
    url.searchParams.set(key, newValue);
    window.history.pushState({}, "", url);
    forceUpdate({});
  };

  return [value, setParamValue];
}
