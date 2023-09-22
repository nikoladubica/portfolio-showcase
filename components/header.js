import Link from "next/link"
import { clearBack, setBack } from "../redux/features/back-slice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { useRef, useEffect } from "react"

const Header = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const warningRef = useRef(null)

  const backClickHandler = () => {
    router.back()
    dispatch(setBack())
  }

  const forwardClickHandler = () => {
    dispatch(clearBack())
  }

  const closeWarningHandler = () => {
    warningRef.current.classList.remove('translate-y-0')
    warningRef.current.classList.add('-translate-y-full')

    setTimeout(() => {
      warningRef.current.remove()
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      warningRef.current.classList.remove('-translate-y-full')
      warningRef.current.classList.add('translate-y-0')
    }, 1300)
  }, [])

  return (
    <header className={`relative flex items-center md:justify-between md:gap-8 bg-white h-6 ${props.pathname !== '/' ? 'justify-between' : 'justify-end'}`}>
        
        <div className="flex items-center gap-4">
          {props.pathname !== '/' ? 
            <img onClick={backClickHandler} src="/img/icons/arrow-left-black.svg" className="md:cursor-pointer" height='24' width='24' />
          : null}

          <Link href="/">
            <img src="/img/icons/logo.svg" height='24' width='24' />
          </Link>
        </div>

        <Link className="" href='/projects' onClick={forwardClickHandler}>
          <p className="uppercase font-bold text-sm text-black hover:text-rose-main transition-colors duration-500">Projects</p> 
        </Link>

        <div ref={warningRef} className="md:hidden fixed top-0 left-0 w-screen z-[1001] bg-yellow-500 p-8 pr-12 transition-transform duration-500 -translate-y-full origin-top">
            <p className="text-black font-normal text-base">For the full experience, use desktop version.</p>
            <img src="/img/icons/close-black.svg" onClick={closeWarningHandler} height='24' width='24' className="absolute top-8 right-8" />
        </div>
    </header>
  )
}

export default Header
