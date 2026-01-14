type ColorCardProps = {
  name: string;
  colorVar: string;
  hex: string;
  isMain?: boolean;
  isLast?: boolean;
};

function getBgClass(colorVar: string): string {
  const bgClassMap: Record<string, string> = {
    'common-black': 'ygi:bg-common-black',
    'common-white': 'ygi:bg-common-white',
    'gray-50': 'ygi:bg-gray-50',
    'gray-100': 'ygi:bg-gray-100',
    'gray-200': 'ygi:bg-gray-200',
    'gray-300': 'ygi:bg-gray-300',
    'gray-400': 'ygi:bg-gray-400',
    'gray-500': 'ygi:bg-gray-500',
    'gray-600': 'ygi:bg-gray-600',
    'gray-700': 'ygi:bg-gray-700',
    'gray-800': 'ygi:bg-gray-800',
    'gray-900': 'ygi:bg-gray-900',
    'primary-50': 'ygi:bg-primary-50',
    'primary-100': 'ygi:bg-primary-100',
    'primary-200': 'ygi:bg-primary-200',
    'primary-300': 'ygi:bg-primary-300',
    'primary-400': 'ygi:bg-primary-400',
    'primary-500': 'ygi:bg-primary-500',
    'primary-600': 'ygi:bg-primary-600',
    'primary-700': 'ygi:bg-primary-700',
    'primary-800': 'ygi:bg-primary-800',
    'primary-900': 'ygi:bg-primary-900',
    'secondary-50': 'ygi:bg-secondary-50',
    'secondary-100': 'ygi:bg-secondary-100',
    'secondary-200': 'ygi:bg-secondary-200',
    'secondary-300': 'ygi:bg-secondary-300',
    'secondary-400': 'ygi:bg-secondary-400',
    'secondary-500': 'ygi:bg-secondary-500',
    'secondary-600': 'ygi:bg-secondary-600',
    'secondary-700': 'ygi:bg-secondary-700',
    'secondary-800': 'ygi:bg-secondary-800',
    'secondary-900': 'ygi:bg-secondary-900',
    'green-100': 'ygi:bg-green-100',
    'green-300': 'ygi:bg-green-300',
    'green-500': 'ygi:bg-green-500',
    'green-700': 'ygi:bg-green-700',
    'green-900': 'ygi:bg-green-900',
    'yellow-100': 'ygi:bg-yellow-100',
    'yellow-300': 'ygi:bg-yellow-300',
    'yellow-500': 'ygi:bg-yellow-500',
    'yellow-700': 'ygi:bg-yellow-700',
    'yellow-900': 'ygi:bg-yellow-900',
    'opacity-gray-2': 'ygi:bg-opacity-gray-2',
    'opacity-gray-4': 'ygi:bg-opacity-gray-4',
    'opacity-gray-8': 'ygi:bg-opacity-gray-8',
    'opacity-gray-16': 'ygi:bg-opacity-gray-16',
    'opacity-gray-50': 'ygi:bg-opacity-gray-50',
    'opacity-gray-80': 'ygi:bg-opacity-gray-80',
  };
  return bgClassMap[colorVar] || '';
}

function ColorCard({ name, colorVar, hex, isMain = false, isLast = false }: ColorCardProps) {
  return (
    <div className="ygi:flex ygi:flex-col ygi:h-[220px] ygi:flex-1">
      <div className={`ygi:flex-1 ${getBgClass(colorVar)}`} />
      <div className={`ygi:bg-common-white ygi:border ygi:border-gray-300 ${!isLast ? 'ygi:border-r' : ''} ygi:flex ygi:flex-col ygi:gap-2 ygi:p-4`}>
        <p className="ygi:body-18-sb ygi:text-common-black">{isMain ? `*${name}` : name}</p>
        <div className="ygi:bg-gray-100 ygi:flex ygi:items-center ygi:h-8 ygi:px-2 ygi:rounded-sm">
          <span className="ygi:caption-12-md ygi:text-gray-900">#{hex}</span>
        </div>
      </div>
    </div>
  );
}

type ColorGroupProps = {
  title: string;
  colors: Array<{ name: string; colorVar: string; hex: string; isMain?: boolean }>;
};

function ColorGroup({ title, colors }: ColorGroupProps) {
  return (
    <div className="ygi:flex ygi:flex-col ygi:gap-5">
      <h2 className="ygi:heading-20-bd ygi:text-gray-900">{title}</h2>
      <div className="ygi:flex ygi:border ygi:border-gray-300 ygi:rounded-lg ygi:overflow-hidden">
        {colors.map((color, index) => (
          <ColorCard key={color.name} {...color} isLast={index === colors.length - 1} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="ygi:flex ygi:flex-col ygi:gap-12 ygi:p-6">
      {/* Common */}
      <ColorGroup
        title="Common"
        colors={[
          { name: "Black", colorVar: "common-black", hex: "000000" },
          { name: "White", colorVar: "common-white", hex: "FFFFFF" },
        ]}
      />

      {/* Gray */}
      <ColorGroup
        title="Gray"
        colors={[
          { name: "Gray 50", colorVar: "gray-50", hex: "F9FAFB" },
          { name: "Gray 100", colorVar: "gray-100", hex: "F3F4F6" },
          { name: "Gray 200", colorVar: "gray-200", hex: "E5E7EB" },
          { name: "Gray 300", colorVar: "gray-300", hex: "D1D5DB" },
          { name: "Gray 400", colorVar: "gray-400", hex: "9CA3AF" },
          { name: "Gray 500", colorVar: "gray-500", hex: "6B7280", isMain: true },
          { name: "Gray 600", colorVar: "gray-600", hex: "4B5563" },
          { name: "Gray 700", colorVar: "gray-700", hex: "374151" },
          { name: "Gray 800", colorVar: "gray-800", hex: "1F2933" },
          { name: "Gray 900", colorVar: "gray-900", hex: "111827" },
        ]}
      />

      {/* Primary (Orange/Red) */}
      <ColorGroup
        title="Key - Orange"
        colors={[
          { name: "Red 50", colorVar: "primary-50", hex: "FFEDEA" },
          { name: "Red 100", colorVar: "primary-100", hex: "FFD1C9" },
          { name: "Red 200", colorVar: "primary-200", hex: "FFAB9E" },
          { name: "Red 300", colorVar: "primary-300", hex: "FF7F6B" },
          { name: "Red 400", colorVar: "primary-400", hex: "FF654E" },
          { name: "Red 500", colorVar: "primary-500", hex: "FF5A3C", isMain: true },
          { name: "Red 600", colorVar: "primary-600", hex: "F2472A" },
          { name: "Red 700", colorVar: "primary-700", hex: "D93A20" },
          { name: "Red 800", colorVar: "primary-800", hex: "B82F1A" },
          { name: "Red 900", colorVar: "primary-900", hex: "912416" },
        ]}
      />

      {/* Secondary (Blue) */}
      <ColorGroup
        title="Secondary - Blue"
        colors={[
          { name: "Blue 50", colorVar: "secondary-50", hex: "ECF6FF" },
          { name: "Blue 100", colorVar: "secondary-100", hex: "D6ECFF" },
          { name: "Blue 200", colorVar: "secondary-200", hex: "ADD9FF" },
          { name: "Blue 300", colorVar: "secondary-300", hex: "7FC3FF" },
          { name: "Blue 400", colorVar: "secondary-400", hex: "66B9FF" },
          { name: "Blue 500", colorVar: "secondary-500", hex: "53B7FF", isMain: true },
          { name: "Blue 600", colorVar: "secondary-600", hex: "3CA9FF" },
          { name: "Blue 700", colorVar: "secondary-700", hex: "1F94F2" },
          { name: "Blue 800", colorVar: "secondary-800", hex: "1678CC" },
          { name: "Blue 900", colorVar: "secondary-900", hex: "115C99" },
        ]}
      />

      {/* Green */}
      <ColorGroup
        title="Green"
        colors={[
          { name: "Green 100", colorVar: "green-100", hex: "DDF9EF" },
          { name: "Green 300", colorVar: "green-300", hex: "7EECC4" },
          { name: "Green 500", colorVar: "green-500", hex: "25DC96", isMain: true },
          { name: "Green 700", colorVar: "green-700", hex: "16B77B" },
          { name: "Green 900", colorVar: "green-900", hex: "0F8A5C" },
        ]}
      />

      {/* Yellow */}
      <ColorGroup
        title="Yellow"
        colors={[
          { name: "Yellow 100", colorVar: "yellow-100", hex: "FFF6BF" },
          { name: "Yellow 300", colorVar: "yellow-300", hex: "FFEE7D" },
          { name: "Yellow 500", colorVar: "yellow-500", hex: "FFE731", isMain: true },
          { name: "Yellow 700", colorVar: "yellow-700", hex: "FFD52F" },
          { name: "Yellow 900", colorVar: "yellow-900", hex: "FFBB00" },
        ]}
      />

      {/* Opacity Gray */}
      <ColorGroup
        title="Gray"
        colors={[
          { name: "Gray 2%", colorVar: "opacity-gray-2", hex: "1F2933" },
          { name: "Gray 4%", colorVar: "opacity-gray-4", hex: "1F2933" },
          { name: "Gray 8%", colorVar: "opacity-gray-8", hex: "1F2933" },
          { name: "Gray 16%", colorVar: "opacity-gray-16", hex: "1F2933" },
          { name: "Gray 60%", colorVar: "opacity-gray-50", hex: "1F2933" },
          { name: "Gray 80%", colorVar: "opacity-gray-80", hex: "1F2933" },
        ]}
      />
    </div>
  );
}
