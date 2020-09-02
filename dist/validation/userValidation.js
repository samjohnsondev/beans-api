"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateUser = (user) => {
    const errors = {};
    let isValid = false;
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (user.email) {
        // Check that the email is the correct format
        if (!emailRegex.test(user.email)) {
            errors.invalidEmail = 'Email is not valid';
        }
    }
    else {
        errors.noEmail = 'Email is required';
    }
    if (!user.password) {
        errors.noPasword = 'Password is required';
    }
    if (Object.keys(errors).length === 0) {
        isValid = true;
    }
    return {
        isValid,
        errors
    };
};
exports.default = validateUser;
