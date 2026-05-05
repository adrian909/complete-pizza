import React from "react";

const MESSAGE = "🍕 Transportul este gratuit pentru minim două pizza comandate. La fiecare pizza comandata un sos sau o bautura GRATIS la alegere.";

const keyframes = `
  @keyframes marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

export default function AnnouncementBar() {
  return (
    <>
      <style>{keyframes}</style>
      <div className="sticky top-0 z-[9998] overflow-hidden py-2" style={{ backgroundColor: "#C44E10" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee-scroll 25s linear infinite" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-sm font-semibold text-white mx-16 shrink-0">
              {MESSAGE}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
