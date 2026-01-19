"use client";

import { ProgressBar } from "#/components/progressBar";
import { Spinner } from "#/components/spinner";
import { useState } from "react";

function InteractiveProgress() {
	const [progress, setProgress] = useState(0);

	const increment = () => setProgress((prev) => Math.min(prev + 10, 100));
	const decrement = () => setProgress((prev) => Math.max(prev - 10, 0));
	const reset = () => setProgress(0);

	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-md">
			<ProgressBar value={progress} />
			<div className="ygi:flex ygi:gap-sm">
				<button
					onClick={decrement}
					className="ygi:px-md ygi:py-xs ygi:bg-palette-gray-200 ygi:rounded-md ygi:body-14-md"
				>
					-10
				</button>
				<button
					onClick={increment}
					className="ygi:px-md ygi:py-xs ygi:bg-palette-gray-200 ygi:rounded-md ygi:body-14-md"
				>
					+10
				</button>
				<button
					onClick={reset}
					className="ygi:px-md ygi:py-xs ygi:bg-palette-gray-200 ygi:rounded-md ygi:body-14-md"
				>
					Reset
				</button>
				<span className="ygi:ml-auto ygi:body-14-md">{progress}%</span>
			</div>
		</div>
	);
}

export default function AtomsPage() {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:p-xl">
			{/* Header */}
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h1 className="ygi:display-28-bd ygi:text-gray-900">Atom Components</h1>
				<p className="ygi:heading-22-sb ygi:text-gray-500">
					단계를 시각화하여 표현한 것으로 진행 상태에 대한 피드백을 사용자에게
					전달합니다.
				</p>
			</div>

			{/* Spinner Section */}
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-bd ygi:text-gray-900">Spinner</h2>

				<div className="ygi:bg-palette-gray-50 ygi:rounded-md ygi:p-xl">
					<p className="ygi:body-14-md ygi:text-gray-500 ygi:mb-md">Sizes</p>
					<div className="ygi:flex ygi:gap-xl ygi:items-center">
						<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
							<Spinner size="small" />
							<span className="ygi:caption-12-md ygi:text-gray-500">
								Small (20px)
							</span>
						</div>
						<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
							<Spinner size="medium" />
							<span className="ygi:caption-12-md ygi:text-gray-500">
								Medium (32px)
							</span>
						</div>
						<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
							<Spinner size="large" />
							<span className="ygi:caption-12-md ygi:text-gray-500">
								Large (44px)
							</span>
						</div>
					</div>
				</div>

			</div>

			{/* ProgressBar Section */}
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-bd ygi:text-gray-900">Progress Bar</h2>

				<div className="ygi:bg-palette-gray-50 ygi:rounded-md ygi:p-xl ygi:flex ygi:flex-col ygi:gap-lg">
					<div className="ygi:flex ygi:flex-col ygi:gap-xs">
						<p className="ygi:body-14-md ygi:text-gray-500">Before (0%)</p>
						<ProgressBar value={0} />
					</div>

					<div className="ygi:flex ygi:flex-col ygi:gap-xs">
						<p className="ygi:body-14-md ygi:text-gray-500">Ongoing (50%)</p>
						<ProgressBar value={50} />
					</div>

					<div className="ygi:flex ygi:flex-col ygi:gap-xs">
						<p className="ygi:body-14-md ygi:text-gray-500">Done (100%)</p>
						<ProgressBar value={100} />
					</div>
				</div>

				<div className="ygi:bg-palette-gray-50 ygi:rounded-md ygi:p-xl">
					<p className="ygi:body-14-md ygi:text-gray-500 ygi:mb-md">
						Interactive Demo
					</p>
					<InteractiveProgress />
				</div>
			</div>
		</div>
	);
}
