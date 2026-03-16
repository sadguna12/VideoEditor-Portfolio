"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
    return (
        <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background glowing effects */}
            <div className="absolute top-1/3 left-0 w-full h-full bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen max-w-lg mx-auto" />

            <div className="container mx-auto px-5 py-6 text-center z-10 max-w-[90%] md:max-w-4xl flex flex-col justify-center h-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wider mb-6">
                        TheSadguna Portfolio
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight">
                        <span className="hidden md:block">
                            Creative <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                                Video Editing
                            </span>
                        </span>
                        <span className="block md:hidden">
                            Video Editing <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                                Portfolio
                            </span>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto tracking-wide">
                        Crafting stories that capture attention
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center gap-4 w-full"
                >
                    <a
                        href="#work"
                        className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-300 shadow-[0_0_20px_rgba(123,97,255,0.3)] hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] w-[calc(100%-3rem)] md:w-auto text-center mx-6"
                    >
                        View My Work
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-white/60" />
                </motion.div>
            </motion.div>
        </section>
    );
}
