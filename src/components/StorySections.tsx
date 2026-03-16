"use client";

import { motion } from "framer-motion";

export default function StorySections() {
    const stories = [
        {
            title: "Storytelling Through Edits",
            description: "Visuals are only halfway there without a compelling narrative pulling the viewer deep into the emotion.",
            align: "left",
        },
        {
            title: "High Retention Social Media Content",
            description: "Data-driven fast-paced hooks and seamlessly matched transitions optimized for the modern algorithm.",
            align: "right",
        },
        {
            title: "Cinematic Brand Videos",
            description: "Polishing your brand's presence with premium, high-fidelity visuals and powerful sound design.",
            align: "left",
        },
        {
            title: "Turning Ideas Into Visual Impact",
            description: "No matter the scale, bridging the gap between raw footage and the final masterpiece.",
            align: "right",
        },
    ];

    return (
        <section className="relative z-10 bg-[#050505] py-32 overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="space-y-40">
                    {stories.map((story, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${story.align === "left" ? "md:items-start text-left" : "md:items-end text-left md:text-right"
                                }`}
                        >
                            <div className="max-w-xl">
                                <span className="text-primary text-sm font-bold tracking-widest uppercase mb-4 block">
                                    0{index + 1}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                    {story.title}
                                </h3>
                                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                                    {story.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
