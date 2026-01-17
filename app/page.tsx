import { Chip } from '#/components/Chip';

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
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h1 className="ygi:display-28-bd ygi:text-gray-900">
					Chip Component
				</h1>

				{/* Default State */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Default State
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Chip>Default</Chip>
						<Chip disabled>Default Disabled</Chip>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						기본 상태입니다. Hover 시 배경색과 텍스트 색상이
						변경됩니다.
					</p>
				</div>

				{/* Selected State */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Selected State
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Chip status="selected">Selected</Chip>
						<Chip status="selected" disabled>
							Selected Disabled
						</Chip>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						선택된 상태입니다. 주요 액션을 강조하는 데 사용됩니다.
					</p>
				</div>

				{/* All States */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						All States
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Chip>Default</Chip>
						<Chip disabled>Default Disabled</Chip>
						<Chip status="selected">Selected</Chip>
						<Chip status="selected" disabled>
							Selected Disabled
						</Chip>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						모든 상태를 한눈에 확인할 수 있습니다. Hover 효과를 직접
						테스트해보세요.
					</p>
				</div>

				{/* Interactive Example */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Interactive Example
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Chip>카테고리 1</Chip>
						<Chip>카테고리 2</Chip>
						<Chip status="selected">카테고리 3</Chip>
						<Chip>카테고리 4</Chip>
						<Chip>카테고리 5</Chip>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						실제 사용 예시입니다. 필터링이나 카테고리 선택에 활용할
						수 있습니다.
					</p>
				</div>
			</div>
		</div>
	);
}
