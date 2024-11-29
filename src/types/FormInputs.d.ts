import React, {ElementType, InputHTMLAttributes} from "react";
import {SingleValue} from "react-select";
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
}

export type SingleFileUploadProps = {
    onFileSelect: (file: File | null) => void;
    label?: string;
    errorMessage?: string;
    disabled?: boolean;
}

export interface SelectInputOption {
    value: string | number;
    label: string;
}

export interface SelectInputProps {
    label: string;
    name: string;
    value: SelectInputOption | null;
    onChange: (option: SingleValue<SelectInputOption>) => void;
    options: SelectInputOption[];
    errorMessage?: string;
    disabled?: boolean;
}

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
