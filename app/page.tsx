import { Layout } from "#/components/layout";

export default function Home() {
  return (
    <Layout.Root>
      <Layout.Header>
        <div className="ygi:h-layout-header-height ygi:bg-palette-gray-300 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          Header
        </div>  
      </Layout.Header>
      <Layout.Content>
        <div className="ygi:h-80 ygi:bg-palette-primary-300 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-gray-900">section 1</h1>
        </div>
        <div className="ygi:h-80 ygi:bg-palette-primary-400 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-gray-900">section 2</h1>
        </div>
        <div className="ygi:h-80 ygi:bg-palette-primary-500 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-gray-900">section 3</h1>
        </div>
        <div className="ygi:h-80 ygi:bg-palette-primary-600 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          <h1 className="ygi:display-28-bd ygi:text-gray-900">section 4</h1>
        </div>
      </Layout.Content>
      <Layout.Footer>
        <div className="ygi:h-layout-footer-height ygi:bg-palette-gray-300 ygi:flex ygi:items-center ygi:justify-center ygi:w-full">
          Footer
        </div>
      </Layout.Footer>
    </Layout.Root>
  );
}
