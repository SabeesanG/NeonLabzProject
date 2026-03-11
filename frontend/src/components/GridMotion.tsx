'use client';

interface GridMotionProps {
  items: (string | React.ReactNode)[];
  gradientColor?: 'black' | 'white';
}

function isImageUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export default function GridMotion({ items, gradientColor = 'black' }: GridMotionProps) {
  const columns = 6;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="grid-motion-layer" />

      <div className="grid h-full grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: columns }).map((_, columnIndex) => {
          const start = (columnIndex * 4) % items.length;
          const columnItems = Array.from({ length: 10 }).map((__, i) => {
            return items[(start + i) % items.length];
          });

          return (
            <div
              key={columnIndex}
              className={`grid-motion-column ${columnIndex % 2 === 0 ? 'grid-motion-up' : 'grid-motion-down'}`}
              style={{
                animationDuration: `${18 + columnIndex * 2}s`,
                animationDelay: `${-columnIndex * 1.2}s`,
              }}
            >
              {columnItems.map((item, itemIndex) => {
                const key = `${columnIndex}-${itemIndex}`;

                if (typeof item === 'string' && isImageUrl(item)) {
                  return (
                    <div key={key} className="grid-motion-tile overflow-hidden">
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${item}')` }}
                      />
                    </div>
                  );
                }

                return (
                  <div key={key} className="grid-motion-tile grid-motion-text-tile">
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 backdrop-blur-sm" />

      <div
        className={
          gradientColor === 'black'
            ? 'absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/35'
            : 'absolute inset-0 bg-linear-to-b from-white/45 via-transparent to-white/45'
        }
      />
    </div>
  );
}
