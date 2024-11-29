import {twc} from "@/utils/tailwind-helper";
import TopBarSearch from "@/components/dashboard/theme/top-bar/TopBarSearch";
import TopBarNotification from "@/components/dashboard/theme/top-bar/TopBarNotification";
import TopBarAccountMenu from "@/components/dashboard/theme/top-bar/TopBarAccountMenu";

const TopBar = ({isTopMenu}: { isTopMenu: boolean }) => {

    if (isTopMenu) {
        return <TopBarItems isTopMenu={isTopMenu}/>;
    } else {
        return (
            <>
                <div className="relative z-[51] flex h-[67px] items-center border-b border-slate-200">
                    <TopBarItems isTopMenu={isTopMenu}/>
                </div>
            </>
        );
    }
};

const TopBarItems = ({isTopMenu}: { isTopMenu: boolean }) => {

    let breadcrumbClass = isTopMenu ? "flex h-full border-white/[0.08] md:ml-10 md:border-l md:pl-10"
        : "hidden sm:flex";

    return (
        <>
            <nav aria-label="breadcrumb" className={twc("-intro-x mr-auto", breadcrumbClass)}>
                <ol className={`flex items-center text-theme-1 dark:text-slate-300 ${isTopMenu && "text-white/90"}`}>
                    <li className="">
                        <a href="">Application</a>
                    </li>
                    <li
                        className={`relative ml-5 pl-0.5 before:content-[''] before:w-[14px] before:h-[14px] 
                            before:bg-chevron-black before:transform before:rotate-[-90deg] before:bg-[length:100%]
                            before:-ml-[1.125rem] before:absolute before:my-auto before:inset-y-0
                            dark:before:bg-chevron-white text-slate-800 cursor-text dark:text-slate-400 
                            ${isTopMenu && "text-white/90"}`}
                    >
                        <a href="">Dashboard</a>
                    </li>
                </ol>
            </nav>

            <TopBarSearch />

            <TopBarNotification isTopBar={isTopMenu}/>

            <TopBarAccountMenu />
        </>
    );
};

export default TopBar;
