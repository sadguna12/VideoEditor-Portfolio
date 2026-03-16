"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock / unlock body scroll when mobile menu opens
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "Services", href: "#services" },
        { name: "Work", href: "#work" },
        { name: "Contact", href: "#contact" },
    ];

    const closeMenu = () => setMobileOpen(false);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                    isScrolled
                        ? "bg-[#0b0b0b]/90 backdrop-blur-md py-4 shadow-lg shadow-primary/10"
                        : "bg-transparent py-6"
                }`}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                    <Link href="#home" className="text-2xl font-bold tracking-tighter text-white" onClick={closeMenu}>
                        <span className="text-primary">The</span>Sadguna
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-white/80 hover:text-primary transition-colors duration-200 text-sm font-medium tracking-wide"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="https://wa.me/919392576149"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 text-sm font-semibold shadow-[0_0_15px_rgba(123,97,255,0.2)] hover:shadow-[0_0_25px_rgba(123,97,255,0.4)]"
                        >
                            Hire Me
                        </Link>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white/80 hover:text-white p-2 z-[110] relative"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25 }}
                                className="block h-0.5 w-full bg-current rounded-full origin-center"
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className="block h-0.5 w-full bg-current rounded-full"
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25 }}
                                className="block h-0.5 w-full bg-current rounded-full origin-center"
                            />
                        </div>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Fullscreen Overlay — only rendered when open */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-10">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.3 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className="text-3xl font-semibold tracking-tight text-white hover:text-primary transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navItems.length * 0.07, duration: 0.3 }}
                            >
                                <Link
                                    href="https://wa.me/919392576149"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMenu}
                                    className="mt-4 inline-block px-8 py-3 rounded-full bg-primary text-white font-semibold text-lg shadow-[0_0_20px_rgba(123,97,255,0.4)] hover:bg-primary-dark transition-all duration-300"
                                >
                                    Hire Me
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
