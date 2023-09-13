import Page from "../../components/page"
import Link from "next/link"
import { clearBack } from "../../redux/features/back-slice"
import { useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

const Projects = () => {
    const dispatch = useDispatch()

    const forwardClickHandler = () => {
      dispatch(clearBack())
    }

    const projects = [
        {
            name: 'One Versus One',
            url: '/projects/one-versus-one',
            image: '/img/mobile-one-versus-one.png'
        },
        {
            name: 'Premium Switzerland',
            url: '/projects/premiumswitzerland',
            image: '/img/mobile-premiumswitzerland.png'
        },
        {
            name: 'Keys To Switzerland',
            url: '/projects/keys-to-switzerland',
            image: '/img/mobile-kts.png'
        }
    ]

    return (
        <Page>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-full h-full py-8">
                <h1 className="text-black text-center font-black text-4xl mb-8">Recent Projects</h1>

                {/* <div className="flex h-[340px] w-full relative mb-8">
                    <Link onClick={forwardClickHandler} href='/projects/keys-to-switzerland'>
                        <img src="/img/mobile-kts.png" className="h-[300px] absolute top-10 left-0 shadow-fine" height='300' />
                    </Link>

                    <Link onClick={forwardClickHandler} href='/projects/premiumswitzerland'>
                        <img src="/img/mobile-premiumswitzerland.png" className="h-[300px] absolute top-5 left-1/2 -translate-x-1/2 shadow-fine" height='300' />
                    </Link>

                    <Link onClick={forwardClickHandler} href='/projects/one-versus-one'>
                        <img src="/img/mobile-one-versus-one.png" className="h-[300px] absolute top-0 right-0 shadow-fine" height='300' />
                    </Link>
                </div> */}

                <div>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="w-auto justify-center items-center bg-transparent"
                    >
                        {projects.map(project => (
                            <SwiperSlide className="bg-transparent">
                                <Link href={project.url} onClick={forwardClickHandler}>
                                    <img src={project.image} className="mx-auto h-[300px] w-[168.9px] md:h-[450px] md:w-[253.35px]" />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <p className="text-black font-light font-base text-center w-full mt-8">Tap on any project to see more 👆</p>
            </div>
        </Page>
    )
}

export default Projects;