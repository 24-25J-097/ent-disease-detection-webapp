import Image from 'next/image';

export default function Loading() {
    return (
        <div className="min-h-screen min-w-full flex items-center justify-center bg-blue-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-72">
                    <Image
                        src="/images/ent-insight-txt-logo.png"
                        alt="Loading"
                        width={1000}
                        height={1000}
                        className="logo"
                    />
                </div>
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary"></div>
                <p className="mt-3 text-base text-gray-500">Loading...</p>
            </div>
        </div>
    );
}
