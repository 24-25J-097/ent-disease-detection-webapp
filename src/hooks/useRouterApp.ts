import { useRouter } from 'next/navigation';

const useRouterApp = () => {

    const router = useRouter();

    // Server-Side Redirect
    const redirect = (path: string) => {
        window.location.replace(path);
    };

    return {
        ...router,
        redirect,
    };
};

export default useRouterApp;
