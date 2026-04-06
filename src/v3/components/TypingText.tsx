import React, { useState, useEffect } from "react";
import { prepareWithSegments, walkLineRanges } from "@chenglou/pretext";
import { useV3ThemeContext } from "../context/ThemeContext/useContext";
import { TYPING_WORDS } from "../constants";

// Pre-measure the widest typing word using pretext (canvas-based, zero DOM reflow).
// walkLineRanges with a huge maxWidth gives the text's natural single-line width.
// This reserves a stable min-width so the parent layout never shifts as words change.
let cachedMaxWidth: number | null = null;
function getMaxWordWidth(): number {
  if (cachedMaxWidth !== null) return cachedMaxWidth;
  cachedMaxWidth = Math.max(
    ...TYPING_WORDS.map((w) => {
      const prepared = prepareWithSegments(w, "500 22px system-ui");
      let lineWidth = 0;
      walkLineRanges(prepared, 99999, (line) => {
        lineWidth = Math.max(lineWidth, line.width);
      });
      return lineWidth;
    }),
  );
  return cachedMaxWidth;
}

const TypingText: React.FC = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [minWidth, setMinWidth] = useState<number | undefined>(undefined);
  const { accentColor } = useV3ThemeContext();

  // Measure after mount so canvas fonts are ready
  useEffect(() => {
    setMinWidth(getMaxWordWidth());
  }, []);

  useEffect(() => {
    const word = TYPING_WORDS[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        75,
      );
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPING_WORDS.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx]);

  return (
    <span
      style={{
        color: accentColor,
        fontWeight: 500,
        display: "inline-block",
        minWidth: minWidth,
      }}
    >
      {displayed}
      <span
        style={{
          borderRight: "2px solid " + accentColor,
          marginLeft: 2,
          animation: "v3blink 0.85s step-end infinite",
        }}
      />
    </span>
  );
};

export default TypingText;
