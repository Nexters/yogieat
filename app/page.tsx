type SpacingExampleProps = {
  name: string;
  value: string;
  spacingClass: string;
};

function GapExample({ name, value, spacingClass }: SpacingExampleProps) {
  return (
    <div className="ygi:flex ygi:flex-col ygi:gap-sm">
      <div className="ygi:flex ygi:items-center ygi:justify-between">
        <span className="ygi:body-14-sb ygi:text-gray-900">{name}</span>
        <span className="ygi:caption-12-md ygi:text-gray-500">{value}</span>
      </div>
      <div className={`ygi:flex ${spacingClass}`}>
        <div className="ygi:w-16 ygi:h-16 ygi:bg-palette-primary-500 ygi:rounded-sm" />
        <div className="ygi:w-16 ygi:h-16 ygi:bg-palette-primary-500 ygi:rounded-sm" />
        <div className="ygi:w-16 ygi:h-16 ygi:bg-palette-primary-500 ygi:rounded-sm" />
      </div>
    </div>
  );
}

function PaddingExample({ name, value, spacingClass }: SpacingExampleProps) {
  return (
    <div className="ygi:flex ygi:flex-col ygi:gap-sm">
      <div className="ygi:flex ygi:items-center ygi:justify-between">
        <span className="ygi:body-14-sb ygi:text-gray-900">{name}</span>
        <span className="ygi:caption-12-md ygi:text-gray-500">{value}</span>
      </div>
      <div className="ygi:bg-palette-gray-200 ygi:rounded-sm ygi:inline-flex">
        <div className={`ygi:bg-palette-primary-500 ygi:rounded-sm ${spacingClass}`}>
          <div className="ygi:w-16 ygi:h-16 ygi:bg-palette-secondary-500 ygi:rounded-xs" />
        </div>
      </div>
    </div>
  );
}

function MarginExample({ name, value, spacingClass }: SpacingExampleProps) {
  return (
    <div className="ygi:flex ygi:flex-col ygi:gap-sm">
      <div className="ygi:flex ygi:items-center ygi:justify-between">
        <span className="ygi:body-14-sb ygi:text-gray-900">{name}</span>
        <span className="ygi:caption-12-md ygi:text-gray-500">{value}</span>
      </div>
      <div className="ygi:bg-palette-gray-200 ygi:p-2 ygi:rounded-sm ygi:inline-flex ygi:flex-col">
        <div className={`ygi:w-16 ygi:h-16 ygi:bg-palette-primary-500 ygi:rounded-sm ${spacingClass}`} />
        <div className="ygi:w-16 ygi:h-16 ygi:bg-palette-secondary-500 ygi:rounded-sm" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:p-xl">
      {/* Gap Section */}
      <div className="ygi:flex ygi:flex-col ygi:gap-md">
        <h1 className="ygi:display-28-bd ygi:text-gray-900">Spacing System</h1>

        <div className="ygi:flex ygi:flex-col ygi:gap-md">
          <h2 className="ygi:heading-20-sb ygi:text-gray-900">Gap</h2>
          <div className="ygi:flex ygi:gap-md ygi:flex-wrap">
            <GapExample name="gap-2xs" value="4px" spacingClass="ygi:gap-2xs" />
            <GapExample name="gap-xs" value="8px" spacingClass="ygi:gap-xs" />
            <GapExample name="gap-sm" value="12px" spacingClass="ygi:gap-sm" />
            <GapExample name="gap-md" value="16px" spacingClass="ygi:gap-md" />
            <GapExample name="gap-xl" value="24px" spacingClass="ygi:gap-xl" />
          </div>
        </div>
      </div>

      {/* Padding Section */}
      <div className="ygi:flex ygi:flex-col ygi:gap-md">
        <h2 className="ygi:heading-20-sb ygi:text-gray-900">Padding</h2>
        <div className="ygi:flex ygi:gap-md ygi:flex-wrap">
          <PaddingExample name="p-2xs" value="4px" spacingClass="ygi:p-2xs" />
          <PaddingExample name="p-xs" value="8px" spacingClass="ygi:p-xs" />
          <PaddingExample name="p-sm" value="12px" spacingClass="ygi:p-sm" />
          <PaddingExample name="p-md" value="16px" spacingClass="ygi:p-md" />
          <PaddingExample name="p-xl" value="24px" spacingClass="ygi:p-xl" />
        </div>
      </div>

      {/* Margin Section */}
      <div className="ygi:flex ygi:flex-col ygi:gap-md">
        <h2 className="ygi:heading-20-sb ygi:text-gray-900">Margin</h2>
        <div className="ygi:flex ygi:gap-md ygi:flex-wrap">
          <MarginExample name="mb-2xs" value="4px" spacingClass="ygi:mb-2xs" />
          <MarginExample name="mb-xs" value="8px" spacingClass="ygi:mb-xs" />
          <MarginExample name="mb-sm" value="12px" spacingClass="ygi:mb-sm" />
          <MarginExample name="mb-md" value="16px" spacingClass="ygi:mb-md" />
          <MarginExample name="mb-xl" value="24px" spacingClass="ygi:mb-xl" />
        </div>
      </div>
    </div>
  );
}
