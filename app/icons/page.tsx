import { ArrowLeftIcon } from '#/components/arrowLeftIcon';
import { ChevronRightIcon } from '#/components/chevronRightIcon';
import { CircleIcon } from '#/components/circleIcon';
import { CrownIcon } from '#/components/crownIcon';
import { HeartIcon } from '#/components/heartIcon';
import { StarIcon } from '#/components/starIcon';
import { XIcon } from '#/components/xIcon';

type IconGridItemProps = {
	name: string;
	icon: React.ReactNode;
};

function IconGridItem({ name, icon }: IconGridItemProps) {
	return (
		<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs ygi:p-md">
			{icon}
			<span className="ygi:caption-12-md ygi:text-gray-600">{name}</span>
		</div>
	);
}

const PRIMARY_COLOR = '#FF5A3C';

export default function IconsPage() {
	return (
		<div className="ygi:flex ygi:flex-col ygi:gap-xl ygi:p-xl">
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h1 className="ygi:display-28-bd ygi:text-gray-900">Icons</h1>
				<p className="ygi:body-14-md ygi:text-gray-600">
					프로젝트에서 사용하는 아이콘 컴포넌트 모음입니다.
				</p>
			</div>

			{/* Icons Section */}
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-sb ygi:text-gray-900">Icons</h2>
				<div className="ygi:grid ygi:grid-cols-6 sm:ygi:grid-cols-8 md:ygi:grid-cols-10 lg:ygi:grid-cols-12 ygi:gap-sm ygi:border ygi:border-gray-200 ygi:rounded-md ygi:p-md">
					<IconGridItem
						name="ChevronRightIcon"
						icon={<ChevronRightIcon size={24} color="#000000" />}
					/>
					<IconGridItem
						name="XIcon"
						icon={<XIcon size={24} color="#000000" />}
					/>
					<IconGridItem
						name="CircleIcon"
						icon={<CircleIcon size={24} color="#000000" />}
					/>
					<IconGridItem
						name="ArrowLeftIcon"
						icon={<ArrowLeftIcon size={24} color="#000000" />}
					/>
					<IconGridItem name="CrownIcon" icon={<CrownIcon size={24} />} />
					<IconGridItem
						name="StarIcon"
						icon={<StarIcon size={24} color={PRIMARY_COLOR} />}
					/>
					<IconGridItem
						name="HeartIcon"
						icon={<HeartIcon size={24} color={PRIMARY_COLOR} />}
					/>
				</div>
			</div>

			{/* Size Examples */}
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-sb ygi:text-gray-900">Size Examples</h2>
				<div className="ygi:flex ygi:items-center ygi:gap-md ygi:p-md ygi:border ygi:border-gray-200 ygi:rounded-md">
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<XIcon size={12} color={PRIMARY_COLOR} />
						<span className="ygi:caption-12-md ygi:text-gray-500">12px</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<XIcon size={16} color={PRIMARY_COLOR} />
						<span className="ygi:caption-12-md ygi:text-gray-500">
							16px (default)
						</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<XIcon size={20} color={PRIMARY_COLOR} />
						<span className="ygi:caption-12-md ygi:text-gray-500">20px</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<XIcon size={24} color={PRIMARY_COLOR} />
						<span className="ygi:caption-12-md ygi:text-gray-500">24px</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<XIcon size={32} color={PRIMARY_COLOR} />
						<span className="ygi:caption-12-md ygi:text-gray-500">32px</span>
					</div>
				</div>
			</div>

			{/* Color Examples */}
			<div className="ygi:flex ygi:flex-col ygi:gap-md">
				<h2 className="ygi:heading-20-sb ygi:text-gray-900">
					Color Examples (Stroke Icons)
				</h2>
				<div className="ygi:flex ygi:items-center ygi:gap-md ygi:p-md ygi:border ygi:border-gray-200 ygi:rounded-md">
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<ChevronRightIcon size={24} color="#000000" />
						<span className="ygi:caption-12-md ygi:text-gray-500">Black</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<ChevronRightIcon size={24} color="#FF5A3C" />
						<span className="ygi:caption-12-md ygi:text-gray-500">Primary</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<ChevronRightIcon size={24} color="#3B82F6" />
						<span className="ygi:caption-12-md ygi:text-gray-500">Blue</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<ChevronRightIcon size={24} color="#10B981" />
						<span className="ygi:caption-12-md ygi:text-gray-500">Green</span>
					</div>
					<div className="ygi:flex ygi:flex-col ygi:items-center ygi:gap-xs">
						<ChevronRightIcon size={24} />
						<span className="ygi:caption-12-md ygi:text-gray-500">
							currentColor
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
