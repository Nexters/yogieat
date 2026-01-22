import { BackwardButton } from "#/components/backwardButton";
import { Layout } from "#/components/layout";
import { StepHeader } from "#/components/stepHeader";
import { colors } from "#/constants/color";

export default function Home() {
	return (
		<Layout.Root>
			<Layout.Header>
				<BackwardButton />
				<div className="ygi:flex ygi:h-layout-header-height ygi:w-full ygi:items-center ygi:justify-center ygi:bg-surface-gray">
					Header
				</div>
				<StepHeader.Root>
					<StepHeader.Title>스텝 헤더 제목</StepHeader.Title>
					<StepHeader.Description>
						스텝 헤더 설명 문구가 여기에 들어갑니다.
					</StepHeader.Description>
				</StepHeader.Root>
			</Layout.Header>
			<Layout.Content>
				<div className="ygi:flex ygi:h-80 ygi:w-full ygi:items-center ygi:justify-center ygi:bg-surface-primary">
					<h1 className="ygi:display-28-bd ygi:text-text-primary">
						section 1
					</h1>
				</div>
				<div className="ygi:flex ygi:h-80 ygi:w-full ygi:items-center ygi:justify-center ygi:bg-surface-secondary">
					<h1 className="ygi:display-28-bd ygi:text-text-primary">
						section 2
					</h1>
				</div>
				<div className="ygi:flex ygi:h-80 ygi:w-full ygi:items-center ygi:justify-center ygi:bg-button-secondary">
					<h1 className="ygi:display-28-bd ygi:text-text-inverse">
						section 3
					</h1>
				</div>
				<div className="ygi:flex ygi:h-80 ygi:w-full ygi:items-center ygi:justify-center ygi:bg-button-secondary-hover">
					<h1 className="ygi:display-28-bd ygi:text-text-inverse">
						section 4
					</h1>
				</div>

				{/* color 변수 기반 예시 */}
				<div
					className="ygi:flex ygi:h-80 ygi:w-full ygi:items-center ygi:justify-center"
					style={{ backgroundColor: colors.palette.primary[500] }}
				>
					<h1
						className="ygi:display-28-bd"
						style={{ color: colors.text.inverse }}
					>
						section 5 (colors 변수 사용)
					</h1>
				</div>
			</Layout.Content>
			<Layout.Footer>
				<div className="ygi:flex ygi:h-layout-footer-height ygi:w-full ygi:items-center ygi:justify-center ygi:bg-surface-gray">
					Footer
				</div>
			</Layout.Footer>
		</Layout.Root>
	);
}
