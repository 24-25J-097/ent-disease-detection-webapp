import * as React from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './PhoneNumberInput.module.scss';
import {PhoneNumberInputProps} from "@/types/FormInputs";
import {If} from "@/components/utils/If";

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
                                                               value,
                                                               onChange,
                                                               placeholder,
                                                               customClass,
                                                               errorMessage,
                                                               disabled,
                                                               label
                                                           }) => {
    return (
        <div className={customClass}>
            {label && (
                <label className="inline-block mb-2">
                    {label}
                </label>
            )}
            <PhoneInput
                value={value}
                onChange={onChange}
                country={'lk'}
                preferredCountries={['lk', 'us', 'gb', 'au']}
                placeholder={placeholder}
                inputProps={{
                    name: 'phone' + Math.floor(Math.random() * 10),
                    required: true,
                    disabled: disabled,
                }}
                defaultMask=".. ... ...."
                countryCodeEditable={false}
                enableSearch={true}
                disableSearchIcon={true}
                containerClass={styles.phoneContainer}
                inputClass={`${styles.phoneInput} ${!!errorMessage ? styles.phoneInputError : ''}`}
                buttonClass={styles.phoneInputBtn}
                dropdownClass={styles.phoneInputDropDown}
                searchClass={styles.searchBar}
            />
            <If condition={!!errorMessage}>
                <small className={styles.errorMessage}>{errorMessage}</small>
            </If>
        </div>
    );
};

export default PhoneNumberInput;

