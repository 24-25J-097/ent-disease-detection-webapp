import React from "react";
import {
    Activity,
    BarChart2,
    Calendar,
    ChevronDown,
    CreditCard,
    Edit,
    FileText,
    HardDrive,
    Home,
    Inbox,
    Layout,
    MessageSquare,
    ShoppingBag,
    Sidebar,
    Trello,
    Users,
    XCircle,
    Zap
} from "lucide-react";

const MobileMenu: React.FC = () => {

    return (
        <>
            <div className="mobile-menu group top-0 inset-x-0 fixed bg-theme-1/90 z-[60] border-b
                            border-white/[0.08] dark:bg-darkmode-800/90 md:hidden before:content-[''] before:w-full
                            before:h-screen before:z-10 before:fixed before:inset-x-0 before:bg-black/90
                            before:transition-opacity before:duration-200 before:ease-in-out before:invisible
                            before:opacity-0 [&.mobile-menu--active]:before:visible
                            [&.mobile-menu--active]:before:opacity-100">
                <div className="flex h-[70px] items-center px-3 sm:px-8">
                    <a className="mr-auto flex" href="">
                        <img className="w-6" src="/images/logo.svg"
                             alt="Midone - Tailwind Admin Dashboard Template"/>
                    </a>
                    <a className="mobile-menu-toggler" href="#">
                        <BarChart2 className="stroke-1.5 h-8 w-8 -rotate-90 transform text-white"/>
                    </a>
                </div>
                <div className="scrollable h-screen z-20 top-0 left-0 w-[270px] -ml-[100%] bg-primary
                              transition-all duration-300 ease-in-out dark:bg-darkmode-800 [&[data-simplebar]]:fixed
                              [&_.simplebar-scrollbar]:before:bg-black/50 group-[.mobile-menu--active]:ml-0">
                    <a href="#" className="fixed top-0 right-0 mt-4 mr-4 transition-opacity duration-200
                                ease-in-out invisible opacity-0 group-[.mobile-menu--active]:visible
                                group-[.mobile-menu--active]:opacity-100">
                        <XCircle className="stroke-1.5 mobile-menu-toggler h-8 w-8 -rotate-90 transform text-white"/>
                    </a>
                    <ul className="py-2">
                        {/*BEGIN: First Child*/}
                        <li>
                            <a className="menu menu--active" href="#">
                                <div className="menu__icon">
                                    <Home className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Dashboard
                                    <div className="menu__sub-icon transform rotate-180">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="menu__sub-open">
                                <li>
                                    <a className="menu menu--active"
                                       href="rubick-simple-menu-dashboard-overview-1-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 1
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-dashboard-overview-2-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 2
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-dashboard-overview-3-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 3
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-dashboard-overview-4-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 4
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <ShoppingBag className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    E-Commerce
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-categories-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Categories
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-add-product-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Add Product
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Products
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-product-list-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Product List</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-product-grid-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Product Grid</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Transactions
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-transaction-list-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Transaction List
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-transaction-detail-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Transaction
                                                    Detail
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Sellers
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-seller-list-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Seller List</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-seller-detail-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Seller Detail</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-reviews-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Reviews
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="menu" href="rubick-simple-menu-inbox-page.html">
                                <div className="menu__icon">
                                    <Inbox className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Inbox
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="menu"
                               href="rubick-simple-menu-file-manager-page.html">
                                <div className="menu__icon">
                                    <HardDrive className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    File Manager
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="menu"
                               href="rubick-simple-menu-point-of-sale-page.html">
                                <div className="menu__icon">
                                    <CreditCard className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Point of Sale
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="menu" href="rubick-simple-menu-chat-page.html">
                                <div className="menu__icon">
                                    <MessageSquare className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Chat
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="menu" href="rubick-simple-menu-post-page.html">
                                <div className="menu__icon">
                                    <FileText className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Post
                                </div>
                            </a>
                        </li>
                        <li>
                            <a className="menu" href="rubick-simple-menu-calendar-page.html">
                                <div className="menu__icon">
                                    <Calendar className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Calendar
                                </div>
                            </a>
                        </li>
                        <li className="menu__divider my-6"></li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <Edit className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Crud
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-crud-data-list-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Data List
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-crud-form-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Form
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <Users className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Users
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-users-layout-1-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Layout 1
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-users-layout-2-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Layout 2
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-users-layout-3-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Layout 3
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <Trello className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Profile
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-profile-overview-1-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 1
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-profile-overview-2-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 2
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-profile-overview-3-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overview 3
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <Layout className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Pages
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Wizards
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wizard-layout-1-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wizard-layout-2-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wizard-layout-3-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 3</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Blog
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-blog-layout-1-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-blog-layout-2-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-blog-layout-3-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 3</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Pricing
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-pricing-layout-1-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-pricing-layout-2-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Invoice
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-invoice-layout-1-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-invoice-layout-2-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            FAQ
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-faq-layout-1-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 1</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-faq-layout-2-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 2</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-faq-layout-3-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Layout 3</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-login-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Login
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-register-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Register
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-error-page-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Error Page
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-update-profile-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Update profile
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-change-password-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Change Password
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu__divider my-6"></li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <Inbox className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Components
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Grid
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-regular-table-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Regular Table</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-tabulator-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Tabulator</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Overlay
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-modal-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Modal</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-slide-over-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Slide Over</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-notification-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Notification</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu" href="rubick-simple-menu-tab-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Tab
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-accordion-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Accordion
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-button-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Button
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-alert-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Alert
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-progress-bar-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Progress Bar
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-tooltip-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Tooltip
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-dropdown-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Dropdown
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-typography-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Typography
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-icon-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Icon
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-loading-icon-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Loading Icon
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <Sidebar className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Forms
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-regular-form-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Regular Form
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-datepicker-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Datepicker
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-tom-select-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Tom Select
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-file-upload-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            File Upload
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu" href="#">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Wysiwyg Editor
                                            <div className="menu__sub-icon ">
                                                <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                            </div>
                                        </div>
                                    </a>
                                    <ul className="">
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wysiwyg-editor-classic-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Classic</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wysiwyg-editor-inline-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Inline</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wysiwyg-editor-balloon-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Balloon</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wysiwyg-editor-balloon-block-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Balloon Block</div>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="menu"
                                               href="rubick-simple-menu-wysiwyg-editor-document-page.html">
                                                <div className="menu__icon">
                                                    <Zap className="stroke-1.5 w-5 h-5"/>
                                                </div>
                                                <div className="menu__title">Document</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-validation-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Validation
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="menu" href="#">
                                <div className="menu__icon">
                                    <HardDrive className="stroke-1.5 w-5 h-5"/>
                                </div>
                                <div className="menu__title">
                                    Widgets
                                    <div className="menu__sub-icon ">
                                        <ChevronDown className="stroke-1.5 w-5 h-5"/>
                                    </div>
                                </div>
                            </a>
                            <ul className="">
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-chart-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Chart
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-slider-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Slider
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="menu"
                                       href="rubick-simple-menu-image-zoom-page.html">
                                        <div className="menu__icon">
                                            <Activity className="stroke-1.5 w-5 h-5"/>
                                        </div>
                                        <div className="menu__title">
                                            Image Zoom
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        {/*END: First Child*/}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MobileMenu;
