import parsePhoneNumberFromString, {isValidPhoneNumber} from "libphonenumber-js";

export const isValidE164PhoneNumber = (phone: string): boolean => {
    const phoneNumber = parsePhoneNumberFromString(phone);

    return !!(phoneNumber && isValidPhoneNumber(phone) && phoneNumber.format('E.164') === phone);
};
