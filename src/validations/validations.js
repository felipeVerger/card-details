// Validacion de erroes 
export const validation = (values) => {
    let errors = {};

    // NAME ERRORS
    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < 5) {
        errors.name = 'Name must be 5 characters or more';
    } else if(values.name.length > 15) {
        errors.name = 'Name must be 15 characters or less';
    }

    // CARD NUMBER ERRORS
    if (!values.number) {
        errors.number = 'Card number is required';
    } else if (values.number.length < 16 || values.number.length > 16) {
        errors.number = 'The card number must be 16 digits';
    }

    // EXPIRATION DATE ERRORS
    const date = values.exp_date_mm + '/' + values.exp_date_yy;
    if (!values.exp_date_mm || !values.exp_date_yy) {
        errors.exp_date = 'Expiration date is required';
    } else if (/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date)) {
        errors.exp_date = 'Expiration date is not valid';
    } else if (values.exp_date_mm < 2 && values.exp_date_yy < 2) {
        errors.exp_date = 'Expiration date must have two digits, ex: 01/22';
    }

    // CVC ERRORS 
    if (!values.cvc) {
        errors.cvc = 'CVC is required';
    } else if (values.cvc < 3) {
        errors.cvc = 'CVC must be 3 digits long';        
    }

    return errors;
}