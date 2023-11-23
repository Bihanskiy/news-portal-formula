import { useState } from "react";

type DefaultAsyncFunc = (...args: any[]) => Promise<any>;
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;


export function useRequest<T extends DefaultAsyncFunc>(fetcher: T) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ThenArg<ThenArg<ReturnType<T> | null>>>(null);

  function fetcherWrap(...args: Parameters<T>) {
    setLoading(true);

    return fetcher(...args)
      .then((res) => {

        if (!res?.error) {
          setData(res);
        } else {
          setError(res.error);
        }

        return res;
      })
      .catch((err) => {

        setError(err);

        return {
          error: err,
        };
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function reset() {
    setLoading(false);
    setError(null);
    setData(null);
  }

  return {
    loading, error, data, reset, request: fetcherWrap,
  };
}