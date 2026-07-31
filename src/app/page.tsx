import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import {Google_Sans, Faculty_Glyphic} from "next/font/google";

const facultyGlyphic = Faculty_Glyphic({
    subsets: ["latin"],
    weight: "400",
});

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <h1 className={facultyGlyphic.className}>Welcome to the Home Page</h1>
        <p className={googleSans.className}>This is the home page content.</p>
      </main>
    </>
  );
}
