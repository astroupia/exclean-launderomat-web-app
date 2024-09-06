"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  LaundaryOne,
  LaundaryTwo,
  LaundaryThree,
  LaundaryFour,
  LaundaryFive,
  LaundarySix,
  LaundarySeven,
  LaundaryEight,
  LaundaryNine,
  LaundaryTen,
  LaundaryEleven,
  LaundaryTwelve,
  LaundaryThirteen,
  LaundaryFourteen,
  LaundaryFifteen,
  LaundarySixteen,
} from "@/public/assets/images/index";
import Button from "../ui/Button";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="bg-white w-full px-4 sm:px-8 py-8 sm:py-12 flex flex-col md:grid md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div className="text-center md:text-left">
        <span className="block mb-2 sm:mb-4 text-xs sm:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-indigo-500 mb-4">
          Do your own stuff; we will clean it up!
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-slate-700 mb-6">
          We work to provide a simple, consistent, high-quality solution to take
          care of everything in your closet.
        </p>
        <Link href="/sign-up">
          <Button content="Your First Order!" className="w-full sm:w-auto" />
        </Link>
      </div>
      <div className="w-full max-w-md mx-auto md:max-w-none">
        <ShuffleGrid />
      </div>
    </section>
  );
};

const shuffle = <T,>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
interface ISquare {
  id: number;
  src: StaticImageData;
}

const squareData: ISquare[] = [
  {
    id: 1,
    src: LaundaryOne,
  },
  {
    id: 2,
    src: LaundaryTwo,
  },
  {
    id: 3,
    src: LaundaryThree,
  },
  {
    id: 4,
    src: LaundaryFour,
  },
  {
    id: 5,
    src: LaundaryFive,
  },
  {
    id: 6,
    src: LaundarySix,
  },
  {
    id: 7,
    src: LaundarySeven,
  },
  {
    id: 8,
    src: LaundaryEight,
  },
  {
    id: 9,
    src: LaundaryNine,
  },
  {
    id: 10,
    src: LaundaryTen,
  },
  {
    id: 11,
    src: LaundaryEleven,
  },
  {
    id: 12,
    src: LaundaryTwelve,
  },
  {
    id: 13,
    src: LaundaryThirteen,
  },
  {
    id: 14,
    src: LaundaryFourteen,
  },
  {
    id: 15,
    src: LaundaryFifteen,
  },
  {
    id: 16,
    src: LaundarySixteen,
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full relative"
    >
      <Image
        src={sq.src}
        alt={`Laundry image ${sq.id}`}
        fill
        style={{ objectFit: "cover" }}
      />
    </motion.div>
  ));
};

const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<JSX.Element[]>(generateSquares());

  useEffect(() => {
    const handleShuffle = () => {
      setSquares(generateSquares());
    };

    const startInterval = () => {
      timeoutRef.current = setInterval(handleShuffle, 4000);
    };

    startInterval();

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[300px] sm:h-[400px] md:h-[450px] gap-1">
      {squares}
    </div>
  );
};

export default Hero;
