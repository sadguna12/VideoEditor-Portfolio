"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type VideoItem = { id: number; youtubeId: string; title: string; };

export default function WorkSection() {
    const [activeTab, setActiveTab] = useState<"long" | "short">("short");
    const [selectedVideo, setSelectedVideo] = useState<{ youtubeId: string; type: "short" | "long" } | null>(null);

    const shortFormVideos: VideoItem[] = [
        { id: 1, youtubeId: "TF5cS3L8PBg", title: "Video 1" },
        { id: 2, youtubeId: "kwWJyNJoTYc", title: "Video 2" },
        { id: 3, youtubeId: "aJY9jZMVT1A", title: "Video 3" },
        { id: 4, youtubeId: "_41Orj-YhnY", title: "Video 4" },
        { id: 5, youtubeId: "iX9j1ATRmL8", title: "Video 5" },
    ];

    const longFormVideos: VideoItem[] = [
        { id: 1, youtubeId: "0sQ3m4xvfb0", title: "Video 1" },
        { id: 2, youtubeId: "9uElYH0KV_8", title: "Video 2" },
        { id: 3, youtubeId: "-eWQLKdegnc", title: "Video 3" },
        { id: 4, youtubeId: "0YvqoRnF8As", title: "Video 4" },
    ];

    useEffect(() => {
        if (selectedVideo) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "15px"; // Prevent layout shift from scrollbar
        } else {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        }
        return () => {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        };
    }, [selectedVideo]);

    return (
        <section id="work" className="py-16 md:py-24 relative bg-[#050505] min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Work</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-12" />

                    {/* Tabs */}
                    <div className="flex items-center justify-center gap-4 mb-16 p-2 bg-[#111] rounded-full w-fit mx-auto border border-white/5">
                        <button
                            onClick={() => setActiveTab("short")}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${activeTab === "short"
                                    ? "text-white"
                                    : "text-white/40 hover:text-white/80"
                                }`}
                        >
                            {activeTab === "short" && (
                                <motion.div
                                    layoutId="activeTabBg"
                                    className="absolute inset-0 bg-primary rounded-full z-[-1] shadow-[0_0_15px_rgba(123,97,255,0.3)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 pointer-events-none">Short Form</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("long")}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative z-10 ${activeTab === "long"
                                    ? "text-white"
                                    : "text-white/40 hover:text-white/80"
                                }`}
                        >
                            {activeTab === "long" && (
                                <motion.div
                                    layoutId="activeTabBg"
                                    className="absolute inset-0 bg-primary rounded-full z-[-1] shadow-[0_0_15px_rgba(123,97,255,0.3)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 pointer-events-none">Long Form</span>
                        </button>
                    </div>
                </motion.div>

                {/* Video Grid */}
                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "short" ? (
                            <motion.div
                                key="short"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {shortFormVideos.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ y: -8 }}
                                        onClick={() => setSelectedVideo({ youtubeId: item.youtubeId, type: "short" })}
                                        className="aspect-[9/16] bg-[#111] rounded-2xl border border-white/5 overflow-hidden group relative cursor-pointer hover:border-primary hover:shadow-[0_0_20px_rgba(123,97,255,0.35)] transition-all duration-300"
                                        style={{ willChange: "transform" }}
                                    >
                                        {/* Thumbnail — lazy loaded */}
                                        <img
                                            src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                                            alt={item.title}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-[#1a1a1a]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 flex flex-col justify-end p-5 pointer-events-none">
                                            <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                                <h4 className="text-white text-sm font-semibold">{item.title}</h4>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none text-white/60 group-hover:text-primary transition-colors duration-300">
                                            <svg className="w-14 h-14 transition-transform duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="long"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                {longFormVideos.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ y: -8 }}
                                        onClick={() => setSelectedVideo({ youtubeId: item.youtubeId, type: "long" })}
                                        className="aspect-video bg-[#111] rounded-2xl border border-white/5 overflow-hidden group relative cursor-pointer hover:border-primary hover:shadow-[0_0_20px_rgba(123,97,255,0.35)] transition-all duration-300"
                                        style={{ willChange: "transform" }}
                                    >
                                        {/* Thumbnail — lazy loaded */}
                                        <img
                                            src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                                            alt={item.title}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                                            <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                                <h4 className="text-white text-2xl md:text-3xl font-semibold">{item.title}</h4>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none text-white/60 group-hover:text-primary transition-colors duration-300">
                                            <svg className="w-16 h-16 transition-transform duration-300 group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Video Modal Placeholder */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 touch-none"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl ${selectedVideo.type === "short" ? "w-[95vw] md:w-full max-w-[400px] aspect-[9/16]" : "w-[95vw] md:w-[80vw] max-w-5xl aspect-video"
                                }`}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-50 p-4 bg-black/60 hover:bg-white/10 text-white rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Iframe only mounts once modal is open — deferred load */}
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
