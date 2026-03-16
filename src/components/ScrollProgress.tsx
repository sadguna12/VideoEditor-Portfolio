"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.to(barRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.1, // Smooth scrubbing
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 w-full h-[3px] bg-[#7b61ff] origin-left z-[100] scale-x-0 pointer-events-none"
        />
    );
}
