import { VALIDATIONS_RULES } from "../config";


const urlParamsValidations = {
  productId: (value: string) => {
    return /^PRO-[0-9A-F]{9}$/.test(value);
  },
  
  productCategory: (value: string) => {
    const maxLength = VALIDATIONS_RULES.productCategoryMaxLength;
    const minLength = VALIDATIONS_RULES.productCategoryMinLength;
    return value.length >= minLength && value.length <= maxLength;
  },

  saleId: (value: string) => {
    return /^SAL-[0-9A-F]{6}$/.test(value);
  },

  productName: (value: string) => {
    const maxLength = VALIDATIONS_RULES.productNameMaxLength;
    const minLength = VALIDATIONS_RULES.productNameMinLength;
    return value.length >= minLength && value.length <= maxLength;
  },

} as const;

export default urlParamsValidations;
