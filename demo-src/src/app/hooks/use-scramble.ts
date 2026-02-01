import { useState, useEffect } from "react";

// types
export interface ScramblingResult {
  text: string;
  hasAnimated: boolean;
}

/**
 * Scrambles a text string by incrementally progressing through a collection of frames.
 * @param {string} text - The text to scramble.
 * @param {boolean} hasPlayed - Mutable flag for playing the scrambled text effect.
 * @param {number} duration - How many milliseconds each frame takes.
 * @param {boolean | undefined} maintainWidth - Whether the text should grow in width as it's scrambling.
 */
const useScramble = (
  text: string,
  hasPlayed: boolean,
  duration?: number,
  maintainWidth: boolean | undefined = true,
): ScramblingResult => {
  // Shuffle the characters from the text string
  const shuffle = (): string =>
    text
      .split("")
      // randomizes the word
      .sort(() => 0.5 - Math.random())
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
    const scrambledTextFrames: string[] = [];

    // check if text to scramble is not empty
    if (text) {
      // generate the scrambled text frames for each letter of the string
      for (let x = text.length; x >= 0; x--) {
        let tmp = shuffle();

        // generate scrambled text frame
        if (maintainWidth) {
          // get the current index position
          const current: number = text.length - x;

          /** concatenate unscrambled text with scrambled text
           * up until the current index position */
          tmp = `${text.slice(0, current)}${tmp.slice(current)}`;
        } else {
          /** cut scrambled text string to
           * the index position of the latest letter */
          tmp = tmp.slice(0, text.length - x);
        }

        // add scambled text frame to the collection
        scrambledTextFrames.push(tmp);
      }

      // add the actual word as the last frame of the scrambled text
      scrambledTextFrames.push(text);
    }

    return scrambledTextFrames;
  };

  // collection of scrambled text frames to progress through
  const [scrambledTextFrames, setScrambledTextFrames] = useState<string[]>([""]);

  // tracks which frame of the scramble animation is currently displayed
  const [latestFrame, setLatestFrame] = useState(0);

  // indicates whether the animation has completed at least once
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  // watcher that shuffles
  useEffect(() => {
    // check if animation has finished playing
    if (!hasPlayed) return;

    // scramble text
    setScrambledTextFrames(generateTextFrames());

    /** resets latest frame for
     * when the animation isn't played a single time
     *
     * setLatestFrame(0); */

    /** reset has animated flag for
     * when the animation isn't played a single time
     *
     * setHasAnimated(false); */
  }, [hasPlayed, text, maintainWidth]);

  // recursive watcher that triggers when the latestFrame index changes
  useEffect(() => {
    // check if animation has finished playing
    if (!hasPlayed) return;

    // stop animation when all the text frames have been iterated through
    if (latestFrame >= scrambledTextFrames.length - 1) {
      setHasAnimated(true);
      return;
    }

    /** triggers when latestFrame changes
    /* checks if:
    /* - the effect is playing
    /* - the position of the latestFrame is
    /*     not equal to the last index of the word */
    const interval = setTimeout(
      () => {
        setLatestFrame((f) => ++f);
      },
      duration ?? 30,
    );

    // cleanup function on unmount
    return () => clearTimeout(interval);
  }, [hasPlayed, latestFrame, duration, scrambledTextFrames.length]);

  // prevent out of bounds index access
  const latest: number =
    Math.min(latestFrame, scrambledTextFrames.length - 1) ?? 0;

  return {
    text:
      scrambledTextFrames[latest] ?? // coalesce to text prop for safety on hydration
      text,
    hasAnimated,
  };
};

export default useScramble;
