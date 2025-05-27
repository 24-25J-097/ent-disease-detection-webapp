import React, {ElementType, InputHTMLAttributes} from "react";
import {MultiValue, SingleValue} from "react-select";
import { CountryData } from "react-phone-input-2";

export type TextInputProps = {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    disabled?: boolean;
    design?: "regular-form" | "default";
    label?: string;
    inputClassName?: string;
    labelClassName?: string;
    icon?: React.ReactNode;
}

export type PasswordInputProps = {
    name: string;
    placeholder: string;
    password: string;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    disabled?: boolean;
    design?: "regular-form" | "default";
    label?: string;
    inputClassName?: string;
    labelClassName?: string;
}

export type SingleFileUploadProps = {
    onFileSelect: (file: File | null) => void;
    label?: string;
    errorMessage?: string;
    disabled?: boolean;
}

/* Select Inputs Types */
export interface SelectInputOption {
    value: string | number;
    label: string;
    avatar?: string;
}

interface CommonSelectProps {
    label: string | React.ReactNode;
    name: string;
    placeholder?: string | React.ReactNode;
    errorMessage?: string;
    // Error display text
    disabled?: boolean;
    // Disable the input
    isSearchable?: boolean;
    // Allow searching (default: true)
    isMultiSelect?: boolean;
    // Enable multi-select mode
    isAsync?: boolean;
    // Enable API-driven search mode
    loadOptions?: (inputValue: string) => Promise<SelectInputOption[]>;
    // Required for async mode, function to load options like,
    // Debounce delay for async searches - Typing: "c" ───wait 300ms───> "ca" ───wait 300ms───> "cat"
    defaultOptions?: boolean | SelectInputOption[];
    // Initial options for async mode
    options?: SelectInputOption[];
    // Static options for non-async mode
    value?: SelectInputOption | MultiValue<SelectInputOption> | null;
    // Controlled value
    onChange: (selected: SingleValue<SelectInputOption> | MultiValue<SelectInputOption>) => void;
    // Change handler
    noOptionsMessage?: ({inputValue}: { inputValue: string }) => string;
    // Allow rich messages
    loadingMessage?: () => string;
    // Loading indicator
}

type SelectInputProps = CommonSelectProps;

export interface PhoneNumberInputProps {
    value: string | null;
    onChange: (value: string, data: CountryData | {}, event: React.ChangeEvent<HTMLInputElement>, formattedValue: string) => void;
    placeholder: string;
    customClass?: string;
    label?: string;
    errorMessage?: string;
    disabled?: boolean;
}

export type TextAreaInputProps = {
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onTextChange: (e: any) => void;
    errorMessage?: string;
    disabled?: boolean;
    label?: string;
}

export interface ToggleSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    handleToggle: () => void;
    checked: boolean;
}

export type SelectedImgDetails = {
    width: number;
    height: number;
    size: number
};

export type DropdownOption = {
    id: string | number;
    label: string;
    onClick: (id?: any) => void;
};

export type DropdownButtonProps = {
    buttonText: string;
    options: DropdownOption[];
    buttonIcon?: ElementType;
    optionIcon?: ElementType;
    buttonClassName?: string;
    dropdownClassName?: string;
    itemClassName?: string;
    showIcon?: boolean;
    selectedOptionId?: string | number;
};
