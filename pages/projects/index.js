import Page from "../../components/page"
import Link from "next/link"
import { clearBack } from "../../redux/features/back-slice"
import { useDispatch } from "react-redux"

const Projects = () => {
    const dispatch = useDispatch()

    const forwardClickHandler = () => {
      dispatch(clearBack())
    }

    return (
        <Page>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <h1 className="text-black text-center font-black text-4xl mb-8">Recent Projects</h1>

                <div className="flex h-[340px] w-full relative mb-8">
                    <Link onClick={forwardClickHandler} href='/projects/keys-to-switzerland'>
                        <img src="/img/mobile-kts.png" className="h-[300px] absolute top-10 left-0 shadow-fine" height='300' />
                    </Link>

                    <Link onClick={forwardClickHandler} href='/projects/premiumswitzerland'>
                        <img src="/img/mobile-premiumswitzerland.png" className="h-[300px] absolute top-5 left-1/2 -translate-x-1/2 shadow-fine" height='300' />
                    </Link>

                    <Link onClick={forwardClickHandler} href='/projects/one-versus-one'>
                        <img src="/img/mobile-one-versus-one.png" className="h-[300px] absolute top-0 right-0 shadow-fine" height='300' />
                    </Link>
                </div>

                <p className="text-black font-light font-base text-center w-full">Tap on any project to see more 👆</p>
            </div>
        </Page>
    )
}

export default Projects;