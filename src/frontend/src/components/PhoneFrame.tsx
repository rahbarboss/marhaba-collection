import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4 sm:p-8">
      {/* Phone outer shell */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: "min(430px, 100vw)",
          height: "min(932px, calc(100vh - 2rem))",
        }}
      >
        {/* Phone body */}
        <div
          className="relative w-full h-full rounded-[48px] overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #2a2a3e, #1a1a2e)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {/* Side buttons left */}
          <div className="absolute left-[-3px] top-[120px] w-[3px] h-[36px] rounded-l-sm bg-[#2a2a3e]" />
          <div className="absolute left-[-3px] top-[168px] w-[3px] h-[64px] rounded-l-sm bg-[#2a2a3e]" />
          <div className="absolute left-[-3px] top-[244px] w-[3px] h-[64px] rounded-l-sm bg-[#2a2a3e]" />
          {/* Side button right */}
          <div className="absolute right-[-3px] top-[180px] w-[3px] h-[80px] rounded-r-sm bg-[#2a2a3e]" />

          {/* Screen bezel */}
          <div className="absolute inset-[6px] rounded-[44px] overflow-hidden bg-[#0f172a] flex flex-col">
            {/* Status bar */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-8 pt-2 pb-1 relative z-10"
              style={{ height: "44px", background: "#0f172a" }}
            >
              <span
                className="text-white text-xs font-semibold"
                style={{ fontFamily: "system-ui" }}
              >
                9:41
              </span>
              {/* Notch */}
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2"
                style={{
                  width: "126px",
                  height: "34px",
                  background: "#000",
                  borderRadius: "0 0 20px 20px",
                }}
              >
                {/* Camera pill */}
                <div
                  className="absolute right-[28px] top-[10px] rounded-full bg-[#1a1a1a]"
                  style={{ width: "12px", height: "12px" }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#333] absolute top-[2px] left-[2px]" />
                </div>
              </div>
              {/* Status icons */}
              <div className="flex items-center gap-1">
                {/* Signal bars */}
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="0"
                    y="8"
                    width="3"
                    height="4"
                    rx="0.5"
                    fill="white"
                  />
                  <rect
                    x="4.5"
                    y="5"
                    width="3"
                    height="7"
                    rx="0.5"
                    fill="white"
                  />
                  <rect
                    x="9"
                    y="2"
                    width="3"
                    height="10"
                    rx="0.5"
                    fill="white"
                  />
                  <rect
                    x="13.5"
                    y="0"
                    width="2.5"
                    height="12"
                    rx="0.5"
                    fill="white"
                  />
                </svg>
                {/* WiFi */}
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="white"
                  aria-hidden="true"
                >
                  <path d="M8 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path
                    d="M4.5 7a4.9 4.9 0 017 0"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 4.5a8 8 0 0112 0"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Battery */}
                <svg
                  width="25"
                  height="12"
                  viewBox="0 0 25 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="21"
                    height="11"
                    rx="2.5"
                    stroke="white"
                    strokeOpacity="0.35"
                  />
                  <rect
                    x="1.5"
                    y="1.5"
                    width="18"
                    height="9"
                    rx="1.5"
                    fill="white"
                  />
                  <path
                    d="M22.5 4v4a2 2 0 000-4z"
                    fill="white"
                    fillOpacity="0.4"
                  />
                </svg>
              </div>
            </div>

            {/* App content area */}
            <div className="flex-1 overflow-hidden relative" id="phone-content">
              {children}
            </div>

            {/* Home indicator */}
            <div
              className="flex-shrink-0 flex items-center justify-center py-2"
              style={{ background: "#0f172a" }}
            >
              <div className="w-[134px] h-[5px] rounded-full bg-white opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
