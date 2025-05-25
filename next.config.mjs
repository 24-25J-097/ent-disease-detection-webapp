/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'styles')],
    },
    images: {
        domains: [
            'ui-avatars.com',
            'localhost',
            'entinsight.com',
            'api.entinsight.com',
            'ai.entinsight.com',
            'firebasestorage.googleapis.com'
        ], // TODO: must change when going production
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
