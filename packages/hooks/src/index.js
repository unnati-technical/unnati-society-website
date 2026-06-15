import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Persist state to localStorage with automatic JSON serialization.
 * @template T
 * @param {string} key - localStorage key
 * @param {T} initialValue
 * @returns {[T, (value: T) => void]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`[useLocalStorage] Failed to set key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue]
}

/**
 * Debounce a rapidly-changing value (e.g., search inputs).
 * @template T
 * @param {T} value
 * @param {number} delay - milliseconds
 * @returns {T}
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/**
 * Track whether the component is mounted (prevents state updates on unmounted components).
 * @returns {React.MutableRefObject<boolean>}
 */
export function useMountedRef() {
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return mounted
}

/**
 * Toggle boolean state with convenience handlers.
 * @param {boolean} initial
 * @returns {{ value: boolean, toggle: () => void, on: () => void, off: () => void }}
 */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  return {
    value,
    toggle: () => setValue((v) => !v),
    on: () => setValue(true),
    off: () => setValue(false),
  }
}

/**
 * Detect if the user is on a mobile device via window width.
 * @param {number} breakpoint - pixel width threshold (default 768)
 * @returns {boolean}
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint
  )

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])

  return isMobile
}

/**
 * Read and write a URL search param.
 * @param {string} param - query param name
 * @param {string} defaultValue
 * @returns {[string, (val: string) => void]}
 */
export function useQueryParam(param, defaultValue = '') {
  const getParam = () => {
    const url = new URL(window.location.href)
    return url.searchParams.get(param) ?? defaultValue
  }

  const [value, setValue] = useState(getParam)

  const setParam = useCallback(
    (val) => {
      const url = new URL(window.location.href)
      if (val === defaultValue) {
        url.searchParams.delete(param)
      } else {
        url.searchParams.set(param, val)
      }
      window.history.pushState({}, '', url)
      setValue(val)
    },
    [param, defaultValue]
  )

  return [value, setParam]
}
