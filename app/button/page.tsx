import { Button } from '#/components/button';

export default function ButtonPage() {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:p-xl">
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h1 className="ygi:display-28-bd ygi:text-gray-900">
					Button Component
				</h1>

				{/* Primary Button */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Primary Button
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Button color="primary">Primary Button</Button>
						<Button color="primary" disabled>
							Primary Disabled
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						주요 액션에 사용되는 버튼입니다. (gray-800 배경)
					</p>
				</div>

				{/* Secondary Button */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Secondary Button
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Button color="secondary">Secondary Button</Button>
						<Button color="secondary" disabled>
							Secondary Disabled
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						보조 액션에 사용되는 버튼입니다. (gray-200 배경)
					</p>
				</div>

				{/* Tertiary Button */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Tertiary Button
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Button color="tertiary">Tertiary Button</Button>
						<Button color="tertiary" disabled>
							Tertiary Disabled
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						강조 액션에 사용되는 버튼입니다. (primary-500 배경)
					</p>
				</div>

				{/* All Types */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						All Button Types
					</h2>
					<div className="ygi:flex ygi:flex-wrap ygi:gap-md">
						<Button color="primary">Primary</Button>
						<Button color="secondary">Secondary</Button>
						<Button color="tertiary">Tertiary</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						세 가지 버튼 타입을 한눈에 확인할 수 있습니다.
					</p>
				</div>

				{/* Interactive Example - 2 Buttons Layout */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Two Buttons Layout (Figma Design)
					</h2>
					<div className="ygi:flex ygi:gap-sm">
						<Button color="secondary" className="ygi:flex-1">
							취소
						</Button>
						<Button color="primary" className="ygi:flex-1">
							확인
						</Button>
					</div>
					<div className="ygi:flex ygi:gap-sm">
						<Button color="secondary" className="ygi:flex-1">
							취소
						</Button>
						<Button color="tertiary" className="ygi:flex-1">
							확인
						</Button>
					</div>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						Figma 디자인의 2버튼 레이아웃 예시입니다.
					</p>
				</div>

				{/* Full Width Example */}
				<div className="ygi:flex ygi:flex-col ygi:gap-sm">
					<h2 className="ygi:heading-20-sb ygi:text-gray-900">
						Full Width Button
					</h2>
					<Button color="primary" className="ygi:w-full">
						전체 너비 버튼
					</Button>
					<p className="ygi:body-14-rg ygi:text-gray-500">
						전체 너비를 차지하는 버튼입니다.
					</p>
				</div>
			</div>
		</div>
	);
}
