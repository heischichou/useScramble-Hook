import React, { useState, useEffect } from "react";

// types
export interface ScramblingResult {
  text: string;
  hasAnimated: boolean;
}

/**
 * Scrambles a text string by incrementally progressing through a collection of frames.
 * @param {string} text - The text to scramble.
 * @param {boolean} hasPlayed - Mutable flag for playing the scrambled text effect.
 * @param {boolean} duration - How many miliseconds each frame takes.
 */
const useScramble = (
  text: string,
  hasPlayed: boolean,
  duration: number | undefined = 30
): ScramblingResult => {
  // Shuffle the characters from the text string
  const shuffle = (): string =>
    text
      .split("")
      // randomizes the word
      .sort(() => {
        return 0.5 - Math.random();
      })
      // reassembles the word
      .join("");

  /** Generates a collection of scrambled text frames.
   *  Example:
   *    Mortis ➝ [
   *      "",
   *      "s"
   *      "ro"
   *      "ort"
   *      "isto"
   *      "Misto"
   *      "srotMi"
   *      "Mortis"
   *   ]
   */
  const generateTextFrames = () => {
    // collection of frames
    let scrambledTextFrames: string[] = [];

    // if text to scramble is not empty
    if (text) {
      // generate the scrambled text frames for each letter of the string
      for (let x = text.length; x >= 0; x--) {
        // generate a string with shuffled characters
        let tmp = shuffle();

        // cut scrambled text string to the index position of the latest letter
        tmp = tmp.slice(0, text.length - x);

        /** push to scrambledTextFrames array to
         * populate the collection of frames */
        scrambledTextFrames.push(tmp);
      }

      // add the actual word as the last frame of the scrambled text
      scrambledTextFrames.push(text);
    }

    return scrambledTextFrames;
  };

  // collection of scrambled text frames to progress through
  const [scrambledTextFrames] = useState<string[]>(generateTextFrames);

  // positional counter for displaying the current scrambled text frame
  const [latestFrame, setLatestFrame] = useState(0);

  // flag for tracking if the animation has finished
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  // recursive watcher that triggers when the latestFrame index changes
  useEffect(() => {
    // recursive timer
    let interval: NodeJS.Timeout | null = null;

    /** triggers when latestFrame changes
    /* checks if:
    /* - the effect is playing
    /* - the position of the latestFrame is
    /*     not equal to the last index of the word */
    if (hasPlayed && latestFrame < scrambledTextFrames.length - 1) {
      interval = setInterval(
        () => {
          setLatestFrame(latestFrame + 1);
        },
        duration ?? 30 // scramble text duration
      );
    }

    // set flag to conclude animation
    if (latestFrame === scrambledTextFrames.length - 1) setHasAnimated(true);

    // cleanup function on unmount
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasPlayed, latestFrame]);

  return {
    text: scrambledTextFrames[latestFrame],
    hasAnimated,
  };
};

export default useScramble;
