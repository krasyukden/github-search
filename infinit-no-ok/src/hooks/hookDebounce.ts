import { useState, useEffect } from 'react';


export const useDebounce = (value: string, delay: number = 500) => {

  const [debounce, setDebounce] = useState(value)//с задержкой отправляет запрос на сервер

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounce
}