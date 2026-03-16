"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 63;
const getFramePath = (index: number) => {
    const paddedIndex = index.toString().padStart(2, "0");
    return `/ezgif-split/frame_${paddedIndex}_delay-0.066s.webp`;
};

export default function HeroScrollAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Text Animations - compressed ranges for single-viewport hero
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

    const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
    const subtitleY = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [40, 0, -40]);

    // Preload Images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImages(loadedImages);
                }
            };
            loadedImages.push(img);
        }
    }, []);

    // GSAP Canvas Animation
    useEffect(() => {
        if (!canvasRef.current || images.length !== FRAME_COUNT) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = (frameIndex: number) => {
            const img = images[frameIndex];
            if (!img) return;
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = cw / 2 - (iw * scale) / 2;
            const y = ch / 2 - (ih * scale) / 2;
            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, x, y, iw * scale, ih * scale);
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render(0);
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const playhead = { frame: 0 };

        const st = gsap.to(playhead, {
            frame: FRAME_COUNT - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=600",
                scrub: 0.5,
            },
            onUpdate: () => render(Math.round(playhead.frame)),
        });

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            st.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [images]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-[100svh] bg-black overflow-hidden flex flex-col pb-20 md:pb-0"
        >
            {/* Canvas background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-black/50 z-10" />
                {/* Bottom gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full block"
                    style={{ willChange: "transform" }}
                />
            </div>


            {/* Content wrapper */}
            <div className="relative z-20 flex flex-col flex-1 items-center justify-center px-6 md:px-12 py-24">

                <motion.div
                    style={{ opacity: titleOpacity, y: titleY, willChange: "transform" }}
                    className="w-full max-w-[85vw] sm:max-w-md mx-auto p-5 md:p-8 flex flex-col items-center text-center rounded-3xl bg-black/50 border border-white/10 shadow-xl z-30"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-widest mb-4 uppercase">
                        PORTFOLIO 2026
                    </span>
                    <h1 className="text-lg sm:text-4xl md:text-6xl font-black tracking-tighter text-white mb-3 leading-tight">
                        <span className="hidden sm:block">
                            Cinematic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                                Video Editing
                            </span>
                        </span>
                        <span className="block sm:hidden">
                            Video Editing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                                Portfolio
                            </span>
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-white/70 font-medium">
                        Turning ideas into stories
                    </p>
                </motion.div>

                {/* Subtitle overlay — only visible on scroll, placed at mid-lower area */}
                <motion.div
                    style={{ opacity: subtitleOpacity, y: subtitleY }}
                    className="absolute bottom-[38%] sm:bottom-24 inset-x-0 flex justify-center px-6 z-30 pointer-events-none"
                >
                    <div className="w-full max-w-[85vw] sm:max-w-md p-4 md:p-7 flex flex-col items-center text-center rounded-3xl bg-black/60 border border-white/10 shadow-xl">
                        <h2 className="text-lg sm:text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                            Scroll to Experience the Story
                        </h2>
                        <div className="w-12 h-1 bg-primary rounded-full mt-3 shadow-[0_0_12px_rgba(123,97,255,0.5)]" />
                    </div>
                </motion.div>

                {/* Scroll hint — pinned at very bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-1 pointer-events-none select-none z-10"
                >
                    <span className="text-[10px] tracking-widest uppercase text-gray-500">Scroll to Explore</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="w-4 h-4 text-gray-600"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>

            {/* Portfolio title + scroll hint — combined bottom anchor */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none select-none text-center max-w-[80vw]"
            >
                <span className="text-2xl sm:text-3xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/80 to-primary-dark">
                    Portfolio
                </span>
                <span className="text-xs tracking-widest uppercase text-gray-400 mt-1">Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="w-4 h-4 text-gray-500 mt-0.5"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
