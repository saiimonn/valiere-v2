import { ReactLenis } from "lenis/react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { useRef } from "react";
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import img5 from './images/img5.png'

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
      <FiHeart className="text-3xl mix-blend-difference" />
      <button
        onClick={() => {
          document.getElementById("launch-schedule")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-1 text-xs text-zinc-400"
      >
        6 MONTHS OF US
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          `url(${img1})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src= {img5}
        alt="And example of a space launch"
        start={-200}
        end={200}
        className="lg:w-1/4 w-1/3"
      />
      <ParallaxImg
        src= {img2}
        alt="An example of a space launch"
        start={200}
        end={-250}
        className="mx-auto lg:w-1/4 md:1/5 w-1/3"
      />
      <ParallaxImg
        src= {img3}
        alt="Orbiting satellite"
        start={-200}
        end={200}
        className="ml-auto lg:w-1/8 md:w-1/4 w-1/3"
      />
      <ParallaxImg
        src= {img4}
        alt="Orbiting satellite"
        start={0}
        end={-500}
        className="ml-24 lg:w-5/12 md:1/4 w-1/2"
      />
    </div>
  );
};

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
    <Message />

    </section>
  );
};

const Message = () => {
    return <div className = "space-y-4">
        <motion.h1 className = "font-medium lg:text-5xl md:text-3xl text-2xl">To my dearest Eri,</motion.h1>

        <motion.p className = "font-light lg:text-2xl md:text-xl sm:text-lg text-justify">
            Before I met you, I was a wreck; A self-destructive, antisocial, wrathful, and sensitive shell of a man who was the product of the people who had hurt him.
            I was at my lowest, I was close to accepting the idea that I wouldn't be able to have someone whom I would share my joys and sorrows with, as I have been told.

            <br /><br />
            Then I met you.

            <br /><br />
            Within the past 6 months you have shown me what it's like to be loved unconditionally, to stick with me throughout my challenges and achievements, and to share a laugh with me.

            <br /> <br />
            Within the past 6 months you have shown me the kind of love that I never thought I would receive from someone. You've proven that there is someone who can love me and accept me for who I am.

            <br /> <br />
            You have lit up my life the same way as you light up the room with your presence. You have made me laugh more times than I can count. And you've always believed in me when I don't even believe in myself.

            <br /> <br />
            Thank you.

            <br /> <br />
            Thank you for loving me. Thank you for always sticking by my side. Thank you for supporting me. And thank you for always making me laugh.
             
            <br /> <br />
            I promise to love you everyday. I promise to always be with you. I promise to support you in everything you do. And I promise that I will never stop making you laugh.

            <br /> <br />
            It's you and it will be you, today, tomorrow, and always. I love you my dear Eri, you complete me.
        </motion.p>

        <motion.p className = "mt-20 font-light lg:text-2xl md:text-xl sm:text-lg text-right">
            Love, Sai
        </motion.p>
    </div>
}