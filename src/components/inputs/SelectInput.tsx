import React from 'react';
import Select, {StylesConfig, components as selectComponents, OptionProps, SingleValueProps} from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import Image from 'next/image';
import {SelectInputOption, SelectInputProps} from '@/types/FormInputs';

const animatedComponents = makeAnimated();

const CustomOption = ({ children, ...props }: OptionProps<any, boolean>) => {
    const {data} = props;

    return (
        <selectComponents.Option {...props}>
            <div className="flex items-center gap-2">
                {data.avatar && (
                    <Image
                        src={data.avatar}
                        alt={`${data.label} avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                        width={100}
                        height={100}
                    />
                )}
                {children}
            </div>
        </selectComponents.Option>
    );
};

const CustomSingleValue = ({ children, ...props }: SingleValueProps<any, boolean>) => {
    const {data} = props;

    return (
        <selectComponents.SingleValue {...props}>
            <div className="flex items-center gap-2">
                {data.avatar && (
                    <Image
                        src={data.avatar}
                        alt={`${data.label} avatar`}
                        className="w-10 h-10 my-1 rounded-full object-cover"
                        width={100}
                        height={100}
                    />
                )}
                {children}
            </div>
        </selectComponents.SingleValue>
    );
};

// TODO: Not used coz with this remove options not work,
//  If need avatar use for multi-select then try to solve that.
// const CustomMultiValue = ({children, ...props}: any) => {
//     const {data} = props;
//
//     return (
//         <selectComponents.MultiValue {...props as ReactNode}>
//             <div className="flex items-center gap-2">
//                 {data.avatar && (
//                     <Image
//                         src={data.avatar}
//                         alt={`${data.label} avatar`}
//                         className="w-10 h-10 my-1 rounded-full object-cover"
//                         width={100}
//                         height={100}
//                     />
//                 )}
//                 {children}
//             </div>
//         </selectComponents.MultiValue>
//     );
// };

const getCustomStyles = (isMultiSelect: boolean): StylesConfig<SelectInputOption, boolean> => ({
    control: (provided) => ({
        ...provided,
        width: '100%',
        fontSize: '0.875rem',
        borderColor: '#E5E7EB',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        borderRadius: '0.375rem',
        transition: 'border-color 200ms ease-in-out, box-shadow 200ms ease-in-out',
        '&:hover': {
            borderColor: '#E5E7EB',
        },
        '&:focus-within': {
            borderColor: 'rgb(var(--color-primary) / 1)',
            boxShadow: '0 0 0 4px rgb(var(--color-primary), 0.1)',
        },
        ...(isMultiSelect ? {} : {borderWidth: 0, cursor: 'text'}),
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? 'rgb(var(--color-primary) / 0.1)'
            : state.isFocused
                ? 'rgb(var(--color-primary) / 0.05)'
                : 'white',
        color: '#111827',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontWeight: state.isSelected ? 600 : 400,
        '&:active': {
            backgroundColor: 'rgb(var(--color-primary) / 0.15)',
        },
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '0.375rem',
        marginTop: '0.25rem',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0,
        // Custom Scrollbar Styling
        '&::-webkit-scrollbar': {
            height: '6.5px !important',
            width: '6.5px !important',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundImage: 'linear-gradient(to bottom, #8e8e8e, #ffffff) !important',
            borderRadius: '10px !important',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundImage: 'linear-gradient(to bottom, #ffffff, #8e8e8e) !important',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#e5e5e5 !important',
        },
        '&::-webkit-scrollbar-thumb:vertical': {
            opacity: '0 !important',
            transition: 'all 0.3s ease-in-out !important',
        },
        '&::-webkit-scrollbar-thumb:hover:vertical': {
            opacity: '1 !important',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#9CA3AF',
    }),
    ...(isMultiSelect ? {
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'rgb(var(--color-primary) / 0.1)',
            borderRadius: '0.25rem',
            padding: '0.1rem 0.25rem',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#111827',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#EF4444',
            ':hover': {
                backgroundColor: '#FEE2E2',
                color: '#B91C1C',
            },
        }),
    } : {
        singleValue: (provided) => ({
            ...provided,
            color: '#111827',
        }),
    }),
});

const SelectInput: React.FC<SelectInputProps> = ({
                                                     label,
                                                     name,
                                                     placeholder,
                                                     value,
                                                     onChange,
                                                     options = [],
                                                     errorMessage,
                                                     disabled,
                                                     isSearchable,
                                                     isMultiSelect = false,
                                                     isAsync = false,
                                                     loadOptions,
                                                     defaultOptions,
                                                     noOptionsMessage,
                                                     loadingMessage,
                                                 }) => {

    const customStyles = getCustomStyles(isMultiSelect);

    const commonProps = {
        id: name,
        name,
        value,
        onChange,
        isMulti: isMultiSelect,
        closeMenuOnSelect: isMultiSelect ? false : undefined,
        components: {
            ...(isMultiSelect ? animatedComponents : {}),
            Option: CustomOption,
            SingleValue: CustomSingleValue,
            // MultiValue: CustomMultiValue,
        },
        styles: customStyles,
        classNamePrefix: "react-select",
        placeholder: placeholder ?? (
            `Select ${typeof label === "string" && label.toLowerCase()}${isMultiSelect ? '(s)' : ''}`
        ),
        className: `cursor-text shadow-sm rounded-md ${errorMessage ? "border border-red-500" : "border border-slate-200"}`,
        isDisabled: disabled,
        isSearchable: isSearchable ?? true,
        noOptionsMessage: noOptionsMessage ?? (
            ({inputValue}: { inputValue: string }) => (inputValue ? 'No results found' : 'No options available')
        ),
        loadingMessage: loadingMessage ?? (
            () => 'Loading...'
        ),
    };

    return (
        <div className={disabled ? "cursor-not-allowed" : ""}>
            <label htmlFor={name} className="inline-block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>

            {isAsync ? (
                <AsyncSelect
                    {...commonProps}
                    loadOptions={loadOptions!}
                    defaultOptions={defaultOptions ?? options}
                    cacheOptions
                />
            ) : (
                <Select
                    {...commonProps}
                    options={options}
                />
            )}

            {!!errorMessage && (
                <small className="text-red-500 px-2">{errorMessage}</small>
            )}
        </div>
    );
};

export default SelectInput;
