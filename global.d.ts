declare module "*.css" {
	const content: { [className: string]: string };
	export default content;
}

namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_API_URL: string;
		NEXT_PUBLIC_AWS_S3: string;
		NEXT_PUBLIC_GTM_ID: string;
		NEXT_PUBLIC_GA_ID: string;
	}
}
