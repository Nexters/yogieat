import { Button } from '#/components/button';

export default function ButtonPage() {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:p-xl">
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h1 className="ygi:display-28-bd ygi:text-gray-900">
					Button Component
				</h1>

				{/* Rounded Buttons */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Button/Rounded/Primary
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md ygi:items-center">
						<Button variant="primary" shape="rounded">
							Default
						</Button>
						<Button variant="primary" shape="rounded" disabled>
							Disabled
						</Button>
						<Button variant="primary" shape="rounded">
							Loading
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						주요 액션에 사용되는 버튼입니다. (gray-900 배경)
					</p>
				</div>

				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Button/Rounded/Secondary
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md ygi:items-center">
						<Button variant="secondary" shape="rounded">
							Default
						</Button>
						<Button variant="secondary" shape="rounded" disabled>
							Disabled
						</Button>
						<Button variant="secondary" shape="rounded">
							Loading
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						강조 액션에 사용되는 버튼입니다. (primary-500 배경)
					</p>
				</div>

				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Button/Rounded/Tertiary
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md ygi:items-center">
						<Button variant="tertiary" shape="rounded">
							Default
						</Button>
						<Button variant="tertiary" shape="rounded" disabled>
							Disabled
						</Button>
						<Button variant="tertiary" shape="rounded">
							Loading
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						보조 액션에 사용되는 버튼입니다. (gray-100 배경)
					</p>
				</div>

				{/* Pill Buttons */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Button/Pill/Primary
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md ygi:items-center">
						<Button variant="primary" shape="pill">
							Default
						</Button>
						<Button variant="primary" shape="pill" disabled>
							Disabled
						</Button>
						<Button variant="primary" shape="pill">
							Loading
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						Pill 형태의 Primary 버튼입니다.
					</p>
				</div>

				{/* All Variants Comparison */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						All Button Variants
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Button variant="primary">Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="tertiary">Tertiary</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						세 가지 버튼 variant를 한눈에 확인할 수 있습니다.
					</p>
				</div>

				{/* Interactive Example - 2 Buttons Layout */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Two Buttons Layout
					</h2>
					<div className="ygi:flex ygi:gap-sm">
						<Button variant="tertiary" width="full">
							취소
						</Button>
						<Button variant="primary" width="full">
							확인
						</Button>
					</div>
					<div className="ygi:flex ygi:gap-sm">
						<Button variant="tertiary" width="full">
							취소
						</Button>
						<Button variant="secondary" width="full">
							확인
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						두 개의 버튼을 나란히 배치한 레이아웃 예시입니다.
					</p>
				</div>

				{/* Full Width Example */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Full Width Button
					</h2>
					<Button variant="primary" width="full">
						전체 너비 버튼
					</Button>
					<Button variant="secondary" width="full">
						전체 너비 버튼 (Secondary)
					</Button>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						전체 너비를 차지하는 버튼입니다.
					</p>
				</div>
			</div>
		</div>
	);
}
