/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nleiqequaduxvlmiitkk.supabase.co',
				port: '',
				pathname: '/storage/v1/object/public/avatars/**',
			},
		],
	},
};

module.exports = nextConfig;

