import { FaInstagram, FaDiscord, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export default function Footer() {
    const socials = [
        { icon: SiGmail, href: "mailto:thesadgunaedit@gmail.com" },
        { icon: FaInstagram, href: "https://instagram.com/thesadguna" },
        { icon: FaDiscord, href: "https://discord.gg/wWNyNTGx" },
        { icon: FaWhatsapp, href: "https://wa.me/919392576149" },
    ];

    return (
        <footer className="py-12 border-t border-white/5 bg-[#050505] text-center">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-white/40 text-sm font-light uppercase tracking-widest">
                    © {new Date().getFullYear()} Video Editor Portfolio
                </p>

                <div className="flex items-center gap-6">
                    {socials.map((Social, index) => (
                        <a
                            key={index}
                            href={Social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/30 hover:text-primary transition-colors duration-300"
                        >
                            <Social.icon className="w-5 h-5" />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
