"use client"

import Page from "../../components/page"
import { useRef } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const Project = () => {
    let project = {url: '', name: ''}

    const router = useRouter()

    const containerRef = useRef(null)
    const iframeRef = useRef(null)
    const resizerRef = useRef(null)
    const textRef = useRef(null)

    const projects = [
        {
            name: 'One Versus One',
            url: 'https://www.one-versus-one.com'
        },
        {
            name: 'Premium Switzerland',
            url: 'https://www.premiumswitzerland.com'
        },
        {
            name: 'Keys To Switzerland',
            url: 'https://www.keys-to-switzerland.com'
        }
    ]

    switch(router.query.project) {
        case 'one-versus-one':
            project = projects[0] 
            break
        case 'premiumswitzerland':
            project = projects[1] 
            break
        case 'keys-to-switzerland':
            project = projects[2] 
            break
    }

    const moveWhileDown = (whileMove) => {
        const endMove = () => {
            window.removeEventListener('mousemove', whileMove)
            window.removeEventListener('mouseup', endMove)
            iframeRef.current.classList.remove('pointer-events-none')
        }

        window.addEventListener('mousemove', whileMove)
        window.addEventListener('mouseup', endMove)
    }

    const mapRange = (value, inMin, inMax, outMin, outMax) => {
        const normalizedValue = (value - inMin) / (inMax - inMin)
        const mappedValue = normalizedValue * (outMax - outMin) + outMin
      
        return mappedValue
      }

    const onDragHandler = () => {
        const contBound = containerRef.current.getBoundingClientRect()

        moveWhileDown(event => {
            if (event.clientX >= ((contBound.right - contBound.left) / 2 + 230) && event.clientX <= contBound.right) {
                const fullW = contBound.right - contBound.left
                const pos = event.clientX - contBound.left

                const x = (pos * 100) / fullW

                resizerRef.current.style.left = x + '%'
                textRef.current.style.width = mapRange(x, 50, 100, 0, 100) + '%'
                iframeRef.current.style.width = mapRange(x, 50, 100, 0, 100) + '%'
                
                iframeRef.current.classList.add('pointer-events-none')
            }
        })
    }

    return (
        <Page>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-full h-full py-8">

                <Link href={project?.url} target="_blank" className="mb-8">
                    <div className="w-full flex justify-center items-center gap-4 select-none">
                        <div className="relative">
                            <span className="hover:opacity-0 text-black w-auto text-left font-black text-4xl transition-opacity duration-500">{project?.name}</span>
                            <h1 className="absolute top-0 left-0 opacity-0 hover:opacity-100 text-black w-auto text-left font-black text-4xl mb-8 select-none transition-opacity duration-500 bg-clip-text text-transparent bg-gradient-to-r from-blue-main to-rose-main">{project?.name}</h1>
                        </div>
                        
                        <img src="/img/icons/arrow-left-black.svg" className="rotate-180" height='24' width='24' />
                    </div>
                </Link>

                <div ref={containerRef} className="relative flex h-full mb-8 select-none" style={{width: 100 + '%'}}>
                    <div ref={iframeRef} className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full select-none bg-gray-300">
                        <iframe
                            className="block site-iframe absolute top-0 left-0 h-full w-full select-none"
                            src={project?.url}
                        />
                    </div>

                    <div ref={resizerRef} onMouseDown={onDragHandler} className="flex flex-col items-center justify-center gap-1 absolute top-0 h-full w-[12px] bg-gray-600 cursor-col-resize hover:bg-blue-main z-[1000] transition-colors duration-500" style={{left: 100 + '%'}}>
                        {/* <span className="absolute h-full w-px bg-gray-300 z-[100]"></span> */}
                        <span className="w-[6px] h-px bg-slate-300"></span>
                        <span className="w-[6px] h-px bg-slate-300"></span>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full">
                    <p ref={textRef} className="text-black font-bold font-base text-right w-full">Resize to see the magic 👆</p>
                </div>
            </div>
        </Page>
    )
}

export default Project;