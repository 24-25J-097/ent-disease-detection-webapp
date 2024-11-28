/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'styles')],
    },
    images: {
        domains: ['ui-avatars.com', 'localhost'], // TODO: must change when going production
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
