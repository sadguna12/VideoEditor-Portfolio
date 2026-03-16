"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ToolsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const iconsRef = useRef<(HTMLImageElement | null)[]>([]);

    const [selectedTool, setSelectedTool] = useState<typeof tools[0] | null>(null);

    // 1. Lock Body Scroll when Modal is Open
    useEffect(() => {
        if (selectedTool) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedTool]);

    const tools = [
        {
            name: "Premiere Pro",
            icon: "/icons/premiere.svg",
            color: "#EA77FF",
            skills: [
                "Basic Cuts",
                "Beat Sync Editing",
                "Cinematic Transitions",
                "Sound Design",
                "Pacing & Story Flow",
                "YouTube Video Editing",
            ],
            title: "Premiere Pro Editing"
        },
        {
            name: "After Effects",
            icon: "/icons/aftereffects.svg",
            color: "#9999FF",
            skills: [
                "Motion Graphics",
                "Text Animations",
                "Logo Reveals",
                "VFX Compositing",
                "Reel Effects",
                "3D Camera Animations",
            ],
            title: "After Effects Motion Graphics"
        },
        {
            name: "DaVinci Resolve",
            icon: "/icons/davinci.svg",
            color: "#FF5E5B",
            skills: [
                "Cinematic Color Grading",
                "LUT Creation",
                "Skin Tone Correction",
                "HDR Look Development",
                "Film Emulation",
                "Color Matching",
            ],
            title: "DaVinci Resolve Color Grading"
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // 4. Scroll reveal animation
            gsap.fromTo(
                cardsRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // 1. Floating animation for icons
            iconsRef.current.forEach((icon, index) => {
                if (icon) {
                    // Start floating from initial to -10px
                    gsap.to(icon, {
                        y: "-10px",
                        duration: 1.5,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut",
                        delay: index * 0.2 // slight stagger
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardsRef.current[index];
        const icon = iconsRef.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();

        // Calculate mouse position relative to the center of the card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 3. Magnetic cursor effect: max movement 10px
        const moveX = ((mouseX - centerX) / centerX) * 10;
        const moveY = ((mouseY - centerY) / centerY) * 10;

        // 2. Hover animation (lifts upward, scales slightly, stronger purple glow)
        gsap.to(card, {
            x: moveX,
            y: moveY - 15, // Lift effect + magnetic Y
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: `0 20px 40px rgba(123, 97, 255, 0.25), inset 0 0 20px rgba(123, 97, 255, 0.1)`
        });

        if (icon) {
            gsap.to(icon, {
                rotate: moveX, // Rotate based on mouse X position
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        const card = cardsRef.current[index];
        const icon = iconsRef.current[index];

        if (card) {
            // Revert card to normal state
            gsap.to(card, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 0px rgba(123, 97, 255, 0)`
            });
        }

        if (icon) {
            // Revert icon rotation/scale while keeping the infinite floating intact
            gsap.to(icon, {
                rotate: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    };

    return (
        <section ref={sectionRef} id="services" className="py-24 relative z-10 bg-[#080808] overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Tools I Use</h2>
                    <div className="w-24 h-1 bg-[#7b61ff] mx-auto rounded-full shadow-[0_0_10px_#7b61ff]" />
                </div>

                {/* 3 columns on desktop, 2 on tablet, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
                    {tools.map((tool, index) => (
                        <div
                            key={tool.name}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                            onClick={() => setSelectedTool(tool)}
                            className="group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center p-[40px] cursor-pointer will-change-transform relative overflow-hidden"
                            style={{
                                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5)`
                            }}
                        >
                            {/* 3. Subtle pulse animation on inner glow (every 4s) */}
                            <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                                className="absolute inset-0 bg-[#7b61ff] rounded-2xl pointer-events-none -z-10"
                            />
                            <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
                                {/* Soft purple glow effect directly behind the icon */}
                                <div className="absolute inset-0 bg-[#7b61ff] opacity-20 blur-2xl rounded-full" />

                                <Image
                                    ref={(el) => {
                                        iconsRef.current[index] = el;
                                    }}
                                    src={tool.icon}
                                    alt={`${tool.name} logo`}
                                    width={80}
                                    height={80}
                                    className="relative z-10 drop-shadow-lg will-change-transform"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white/90 tracking-wide mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                                {tool.name}
                            </h3>

                            {/* 2. Visual Click Hint */}
                            <span className="text-sm text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider font-light">
                                Click to Explore
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Skill Panel Modal */}
            <AnimatePresence>
                {selectedTool && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Blurred Dark Overlay */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                            onClick={() => setSelectedTool(null)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="relative w-[90%] md:w-[80%] lg:w-[500px] bg-[#111111]/80 backdrop-blur-xl border border-[#7b61ff]/40 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(123,97,255,0.15)] overflow-hidden"
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            {/* Inner Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-[#7b61ff]/20 rounded-full blur-[80px] -z-10 pointer-events-none" />

                            <button
                                onClick={() => setSelectedTool(null)}
                                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 p-2">
                                    <Image
                                        src={selectedTool.icon}
                                        alt={selectedTool.name}
                                        width={32}
                                        height={32}
                                        className="drop-shadow-md"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {selectedTool.title}
                                </h3>
                            </div>

                            <ul className="flex flex-col gap-[12px]">
                                {selectedTool.skills.map((skill, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className="flex items-center gap-3 text-white/80 text-lg"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b61ff] shadow-[0_0_8px_#7b61ff]" />
                                        {skill}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
