type RadiusExampleProps = {
  name: string;
  value: string;
  radiusClass: string;
};

function RadiusExample({ name, value, radiusClass }: RadiusExampleProps) {
  return (
    <div className={`ygi:flex-1 ygi:flex ygi:flex-col ygi:h-[200px] ygi:bg-palette-primary-50 ygi:border-t-2 ygi:border-r-2 ygi:border-palette-primary-500 ${radiusClass}`}>
      <div className="ygi:bg-common-white ygi:flex ygi:flex-col ygi:gap-2 ygi:p-4 ygi:mt-auto">
        <p className="ygi:body-18-sb ygi:text-common-black">{name}</p>
        <div className="ygi:bg-gray-100 ygi:flex ygi:items-center ygi:h-8 ygi:px-2 ygi:rounded-sm">
          <span className="ygi:caption-12-md ygi:text-gray-900">{value}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="ygi:flex ygi:flex-col ygi:gap-12 ygi:p-6">
      <div className="ygi:flex ygi:flex-col ygi:gap-8">
        <h1 className="ygi:display-28-bd ygi:text-gray-900">Radius example</h1>
        <div className="ygi:flex ygi:gap-8">
          <RadiusExample
            name="Radius-none"
            value="0px"
            radiusClass=""
          />
          <RadiusExample
            name="Radius-XS"
            value="4px"
            radiusClass="ygi:rounded-tr-xs"
          />
          <RadiusExample
            name="Radius-Small"
            value="8px"
            radiusClass="ygi:rounded-tr-sm"
          />
          <RadiusExample
            name="Radius-Medium"
            value="12px"
            radiusClass="ygi:rounded-tr-md"
          />
          <RadiusExample
            name="Radius-Large"
            value="16px"
            radiusClass="ygi:rounded-tr-lg"
          />
          <RadiusExample
            name="Radius-XL"
            value="24px"
            radiusClass="ygi:rounded-tr-xl"
          />
          <RadiusExample
            name="Radius-Full"
            value="999px"
            radiusClass="ygi:rounded-tr-full"
          />
        </div>
      </div>
    </div>
  );
}
