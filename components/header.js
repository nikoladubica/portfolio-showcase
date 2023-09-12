import Link from "next/link"
import { clearBack, setBack } from "../redux/features/back-slice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { useRef } from "react"

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

  const closeWarningHandler = (e) => {
    warningRef.current.remove()
  }

  return (
    <header className={`relative flex items-center md:justify-center md:gap-8 bg-white h-6 ${props.pathname !== '/' ? 'justify-between' : 'justify-end'}`}>
        {props.pathname !== '/' ? 
          <img onClick={backClickHandler} src="/img/icons/arrow-left-black.svg" className="" height='24' width='24' />
        : null}
        <Link href='/projects' onClick={forwardClickHandler}>
          <p className="uppercase font-bold text-sm md:hidden text-black">Projects</p> 
        </Link>
       

        <p className="uppercase font-bold text-base hidden md:block text-black">One-Versus-One</p>
        <p className="uppercase font-bold text-base hidden md:block text-black">Premium Switzerland</p>
        <p className="uppercase font-bold text-base hidden md:block text-black">Keys To Switzerland</p>

        <div ref={warningRef} className="md:hidden fixed top-0 left-0 w-screen z-[1001] bg-yellow-500 p-8 pr-12">
            <p className="text-black font-normal text-base">For the full experience, use desktop version.</p>
            <img src="/img/icons/close-black.svg" onClick={closeWarningHandler} height='24' width='24' className="absolute top-8 right-8" />
        </div>
    </header>
  )
}

export default Header
