"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Faculty_Glyphic, Google_Sans, Audiowide} from "next/font/google";
import Buttons from "./all/buttons/page";

const facultyGlyphic = Faculty_Glyphic({
    subsets: ["latin"],
    weight: "400",
});

const audiowide = Audiowide({
    subsets: ["latin"],
    weight: "400",
});

const googleSans = Google_Sans({
    subsets: ["latin"],
    weight: "400",
});

const links: Record<string, string> = {
    "All Components": "/all",
    Cards: "/all/cards",
    Buttons: "/all/buttons",
};

const Navigation = () => {
    const pathname = usePathname();

    return (
        <>
            <div className="flex items-center justify-around py-2 px-8">
                <Link href="/" className={`text-4xl font-bold ${audiowide.className}`}>
                    GSAP Lab
                </Link>
            <nav className="max-w-fit flex gap-4 py-4 px-8 bg-gray-200 align-middle justify-center my-2 mx-auto rounded-full">
                {Object.entries(links)
                    .filter(([, href]) => href !== pathname)
                    .map(([label, href]) => (
                        <Link key={href} href={href} className={`text-gray-700 ${facultyGlyphic.className}`}>
                            {label}
                        </Link>
                ))}
            </nav>
            <a className={`px-8 py-2 button bg-blue-500 hover:bg-blue-600 text-white rounded-full ${facultyGlyphic.className}`} href="https://dilpreet-singh.vercel.app" target="_blank" rel="noopener noreferrer">
                Visit My Portfolio
            </a>
            </div>
        </>
    );
};

export default Navigation;