"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function ContactSection() {
    const socials = [
        {
            name: "Gmail",
            icon: SiGmail,
            href: "mailto:thesadgunaedit@gmail.com",
            color: "#EA4335",
        },
        {
            name: "Instagram",
            icon: FaInstagram,
            href: "https://instagram.com/thesadguna",
            color: "#E1306C",
        },
        {
            name: "Discord",
            icon: FaDiscord,
            href: "https://discord.gg/wWNyNTGx",
            color: "#5865F2",
        },
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            href: "https://wa.me/919392576149",
            color: "#25D366",
        },
    ];

    return (
        <section id="contact" className="py-32 relative bg-[#0b0b0b] overflow-hidden border-t border-white/5">
            {/* Background glow for contact section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />

            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tight drop-shadow-lg">
                        Let&apos;s Work Together
                    </h2>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {socials.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                                whileHover={{ scale: 1.15, y: -8, boxShadow: `0px 0px 20px ${social.color}80` }}
                                className="w-20 h-20 md:w-24 md:h-24 bg-[#111] border border-white/5 rounded-3xl flex items-center justify-center group hover:border-white/20 transition-all duration-300 shadow-xl cursor-pointer"
                            >
                                <social.icon
                                    className="w-10 h-10 md:w-12 md:h-12 text-white/40 group-hover:text-white transition-colors duration-300"
                                    style={{ color: "currentColor" }}
                                />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
