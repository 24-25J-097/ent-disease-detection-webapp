import React from 'react';
import Select, {StylesConfig} from 'react-select';
import {SelectInputOption, SelectInputProps} from "@/types/FormInputs";

const customStyles: StylesConfig<SelectInputOption, false> = {
    control: (provided) => ({
        ...provided,
        width: '100%',
        fontSize: '0.875rem', // text-sm
        borderColor: '#E5E7EB', // border-slate-200
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', // shadow-sm
        borderRadius: '0.375rem', // rounded-md
        transition: 'border-color 200ms ease-in-out, box-shadow 200ms ease-in-out', // transition
        '&:hover': {
            borderColor: '#E5E7EB', // border-slate-200
        },
        '&:focus-within': {
            borderColor: 'rgb(var(--color-primary) / 1)', // focus:border-primary
            boxShadow: '0 0 0 4px rgb(var(--color-primary), 0.1)', // focus:ring-4 focus:ring-primary focus:ring-opacity-20
        },
        borderWidth: 0,
        cursor: 'text',
        // backgroundColor: '#1F2937', // dark:bg-darkmode-800
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'rgb(var(--color-primary) / 1)' : state.isFocused ? 'rgb(var(--color-primary) / 0.2)' : 'white',
        color: state.isSelected ? 'white' : '#111827', // Tailwind's gray-900
        padding: '0.5rem 1rem',
        cursor: 'pointer',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '0.375rem',
        marginTop: '0.25rem',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#111827', // Tailwind's gray-900
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#9CA3AF', // Tailwind's gray-400
    }),
};

const SelectInput: React.FC<SelectInputProps> = ({
                                                     label,
                                                     name,
                                                     value,
                                                     onChange,
                                                     options,
                                                     errorMessage,
                                                     disabled,
                                                 }) => {

    return (
        <div>
            <label htmlFor={name} className="inline-block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <Select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                options={options}
                styles={customStyles}
                classNamePrefix="react-select"
                placeholder={`Select the ${label.toLowerCase()}`}
                className={`z-[4000] cursor-text shadow-sm rounded-md 
                ${!!errorMessage ? "border border-red-500" : "border border-slate-200"}`}
                isDisabled={disabled}
            />
        </div>
    );
};

export default SelectInput;
