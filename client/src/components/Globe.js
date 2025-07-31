'use client';

export default function RotatingGlobe() {
  return (
    <div className="w-full h-full flex items-center justify-start p-4">
      <svg
        width="200"
        height="200"
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-animation"
        fill="#fff"
        style={{
          overflow: 'visible',
        }}
      >
        <g className="rotate">
          <defs>
            <clipPath id="__clip">
              <rect width="120" height="120" x="0" y="0"></rect>
            </clipPath>
          </defs>

          <g clipPath="url(#__clip)">
            <g transform="matrix(-0.949195,0.314688,-0.314688,-0.949195,99.61,71.92)">
              <path
                d="M44,0 C68.28,0 88,19.72 88,44 C88,68.28 68.28,88 44,88 C19.72,88 0,68.28 0,44 C0,19.72 19.72,0 44,0z"
                fill="none"
                stroke="#2D3E50"
                strokeWidth="2"
              />
            </g>
            <g transform="matrix(-0.949195,0.314688,-0.314688,-0.949195,84.42,76.95)">
              <path
                d="M28,0 C43.45,0 56,19.72 56,44 C56,68.28 43.45,88 28,88 C12.55,88 0,68.28 0,44 C0,19.72 12.55,0 28,0z"
                fill="none"
                stroke="#2D3E50"
                strokeWidth="2"
              />
            </g>
            <g transform="matrix(-0.949195,0.314688,-0.314688,-0.949195,69.23,81.99)">
              <path
                d="M12,0 C18.62,0 24,19.72 24,44 C24,68.28 18.62,88 12,88 C5.38,88 0,68.28 0,44 C0,19.72 5.38,0 12,0z"
                fill="none"
                stroke="#2D3E50"
                strokeWidth="2"
              />
            </g>
            <g transform="matrix(-0.314688,-0.949195,0.949195,-0.314688,11.05,84.42)">
              <path
                d="M28,0 C43.45,0 56,19.72 56,44 C56,68.28 43.45,88 28,88 C12.55,88 0,68.28 0,44 C0,19.72 12.55,0 28,0z"
                fill="none"
                stroke="#2D3E50"
                strokeWidth="2"
              />
            </g>
            <g transform="matrix(-0.314688,-0.949195,0.949195,-0.314688,6.01,69.24)">
              <path
                d="M12,0 C18.62,0 24,19.72 24,44 C24,68.28 18.62,88 12,88 C5.38,88 0,68.28 0,44 C0,19.72 5.38,0 12,0z"
                fill="none"
                stroke="#2D3E50"
                strokeWidth="2"
              />
            </g>
          </g>
        </g>

        <style jsx>{`
          .rotate {
            transform-origin: 50% 50%;
            transform-box: fill-box;
          }

          .rotate-animation .rotate {
            animation: spin 10s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </svg>
    </div>
  );
}
