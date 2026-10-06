import { useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const LoadingBarProvider = ({ children }) => {
  const loadingBarRef = useRef(null)

  useEffect(() => {
    window.loadingBarRef = loadingBarRef.current

    return () => {
      delete window.loadingBarRef
    }
  }, [])

  return (
    <>
      <LoadingBar
        color="#f11946"
        ref={loadingBarRef}
        height={3}
        progress={10}
        waitingTime={500}
        shadow={true}
      />
      {children}
    </>
  )
}

export default LoadingBarProvider
