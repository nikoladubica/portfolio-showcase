import Link from "next/link"
import { clearBack, setBack } from "../redux/features/back-slice"
import { useDispatch } from "react-redux"

const Header = (props) => {
  const dispatch = useDispatch()

  const backClickHandler = () => {
    dispatch(setBack())
  }

  const forwardClickHandler = () => {
    dispatch(clearBack())
  }

  return (
    <header className={`flex items-center md:justify-center md:gap-8 bg-white h-6 ${props.pathname !== '/' ? 'justify-between' : 'justify-end'}`}>
        {props.pathname !== '/' ? 
          <Link href='/' onClick={backClickHandler}>
            {/* <p className="uppercase font-bold text-sm md:hidden text-black">Home</p>  */}
            <img src="/img/icons/arrow-left-black.svg" className="" height='24' width='24' />
          </Link>
        : null}
        <Link href='/projects' onClick={forwardClickHandler}>
          <p className="uppercase font-bold text-sm md:hidden text-black">Projects</p> 
        </Link>
       

        <p className="uppercase font-bold text-base hidden md:block text-black">One-Versus-One</p>
        <p className="uppercase font-bold text-base hidden md:block text-black">Premium Switzerland</p>
        <p className="uppercase font-bold text-base hidden md:block text-black">Keys To Switzerland</p>
    </header>
  )
}

export default Header
