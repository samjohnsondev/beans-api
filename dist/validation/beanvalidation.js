"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Setup some validation to return some errors.
const validateBean = ((bean) => {
    const errors = {};
    let isValid = false;
    if (!bean.colour) {
        errors.colour = 'Colour is required';
    }
    if (!bean.name) {
        errors.name = 'Name is required';
    }
    if (!bean.displayDate) {
        errors.date = 'Date is required';
    }
    if (!bean.imagePath) {
        errors.image = 'Image is required';
    }
    if (!bean.odor) {
        errors.odor = 'Odor is required';
    }
    if (!bean.price) {
        errors.price = 'Price is required';
    }
    if (Object.keys(errors).length === 0) {
        isValid = true;
    }
    return {
        errors,
        isValid
    };
});
exports.default = validateBean;
