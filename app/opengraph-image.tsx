import { ImageResponse } from "next/og";

export const alt = "Jhonacunn | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07090D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.06), transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            Jhonacunn
          </h1>

          {/* Role badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 24px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 18,
              color: "#a1a1aa",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#00D4FF",
              }}
            />
            Full-Stack Developer
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 22,
              color: "#71717a",
              textAlign: "center",
              maxWidth: 600,
              margin: 0,
            }}
          >
            Crafting digital experiences at the intersection
            of design and engineering
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
