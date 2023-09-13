import Page from "../../components/page"
import Link from "next/link"
import { clearBack } from "../../redux/features/back-slice"
import { useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from 'swiper/modules'
import { motion } from "framer-motion"

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
                <h1 className="text-black text-center font-black text-4xl mb-8">
                    Recent Projects
                </h1>

                <div>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="w-auto justify-center items-center bg-transparent"
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={project.url} className="bg-transparent">
                                <Link href={project.url} onClick={forwardClickHandler}>
                                    <motion.img 
                                        key={project.url}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: (index / 5) + 0.2 }}
                                        src={project.image} className="mx-auto h-[300px] w-[168.9px] md:h-[450px] md:w-[253.35px]" />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <motion.p 
                    key={2}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-black font-light font-base text-center w-full mt-8">
                        Swipe and tap on any project to see more 👆
                </motion.p>
            </div>
        </Page>
    )
}

export default Projects;