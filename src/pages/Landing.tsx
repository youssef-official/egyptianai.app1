import React from "react";

// صفحة Landing.tsx
export default function Landing() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        margin: 0,
        padding: 0,
        border: "none",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <iframe
        src="https://v0-medical-website-design-eta.vercel.app/"
        title="Cura Verse - Medical Website"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        loading="lazy"
      />
    </div>
  );
}
