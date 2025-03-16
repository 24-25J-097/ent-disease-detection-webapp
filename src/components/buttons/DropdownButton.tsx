import React, {useState, useEffect, useRef} from 'react';
import {ChevronDown} from 'lucide-react';
import {DropdownButtonProps} from "@/types/FormInputs";

const DropdownButton: React.FC<DropdownButtonProps> = ({
                                                           buttonText,
                                                           options,
                                                           buttonIcon: ButtonIcon,
                                                           optionIcon: OptionIcon,
                                                           buttonClassName,
                                                           dropdownClassName,
                                                           itemClassName,
                                                           showIcon = true,
                                                           selectedOptionId,
                                                       }) => {

    const [selectedOption, setSelectedOption] = useState<string | number>(selectedOptionId || "");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [openUpward, setOpenUpward] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current
                && ('contains' in dropdownRef.current && !dropdownRef.current?.contains(event.target as Node))) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    useEffect(() => {
        const updateDropdownPosition = () => {
            if (isOpen && buttonRef.current && dropdownRef.current) {
                let buttonRect;
                let dropdownHeight;
                if ('getBoundingClientRect' in buttonRef.current) {
                    buttonRect = buttonRef.current.getBoundingClientRect();
                }
                if ('getBoundingClientRect' in dropdownRef.current) {
                    dropdownHeight = dropdownRef.current.getBoundingClientRect().height;
                }
                const viewportHeight = window.innerHeight;

                if ((buttonRect?.bottom ?? 0) + (dropdownHeight ?? 0) > viewportHeight) {
                    setOpenUpward(true);
                } else {
                    setOpenUpward(false);
                }
            }
        };

        updateDropdownPosition();
        window.addEventListener('resize', updateDropdownPosition);

        return () => {
            window.removeEventListener('resize', updateDropdownPosition);
        };
    }, [isOpen]);

    const handleSelect = (option: any) => {
        option.onClick(option.id);
        setSelectedOption(option.id);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className={`dropdown relative ${buttonClassName}`}>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className={`transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 
                px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 
                focus-visible:outline-none w-full ${buttonClassName}`}
            >
                {showIcon && ButtonIcon && <ButtonIcon className="mr-2 h-4 w-4"/>}
                {selectedOption
                    ? options.find(option => option.id === selectedOption)?.label
                    : buttonText}
                <span className="ml-auto"><ChevronDown className="h-5 w-5"/></span>
            </button>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={`dropdown-menu absolute z-[9999] mt-1 rounded-md border-transparent w-full
                    shadow-[0px_3px_10px_#00000017] ${dropdownClassName} ${openUpward ? 'bottom-full mb-1' : ''}`}
                >
                    <div className={`dropdown-content p-2 w-full rounded-md ${dropdownClassName}`}>
                        {options.map((option, index) => (
                            <a
                                key={index}
                                id={option.id.toString()}
                                onClick={() => handleSelect(option)}
                                className={`cursor-pointer flex items-center p-2 transition duration-300 ease-in-out 
                                rounded-md hover:bg-slate-200/60 w-full ${itemClassName}`}
                            >
                                {showIcon && OptionIcon && <OptionIcon className="mr-2 h-4 w-4"/>}
                                {option.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
