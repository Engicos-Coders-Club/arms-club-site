'use client';
import { useState, useEffect } from "react";

const randomLetter = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return letters[Math.floor(Math.random() * letters.length)];
};

interface RandomTextProps {
  page: string;
}

const TextRandomizer: React.FC<RandomTextProps> = ({ page }) => {
  const [text, setText] = useState(page.split("").map(() => ""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSettling, setIsSettling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (isVisible) {
      let randomizeInterval: NodeJS.Timeout;
      let settleTimeout: NodeJS.Timeout;

      // Randomize letters
      randomizeInterval = setInterval(() => {
        setText((prevText) =>
          prevText.map((char, index) =>
            index < currentIndex ? page[index] : randomLetter()
          )
        );
      }, 100);

      settleTimeout = setTimeout(() => {
        clearInterval(randomizeInterval);
        setIsSettling(true);
      }, 2000);

      return () => {
        clearInterval(randomizeInterval);
        clearTimeout(settleTimeout);
      };
    }
  }, [isVisible, currentIndex, page]);

  useEffect(() => {
    if (isSettling) {
      const settleInterval = setInterval(() => {
        setText((prevText) => {
          const newText = [...prevText];
          newText[currentIndex] = page[currentIndex];
          return newText;
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);

        if (currentIndex >= page.length) {
          clearInterval(settleInterval);
        }
      }, 100);

      return () => clearInterval(settleInterval);
    }
  }, [isSettling, currentIndex, page]);

  return <span>{isVisible ? text.join("") : ""}</span>;
};

export default TextRandomizer;
