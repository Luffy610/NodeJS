const validator = require('validator');

const validateSignupData = (data) => {
    if (data.username === 'undefined' || data.username === '') {
        throw new Error('Username is required');
    }
    else if (data.emailId === 'undefined' || data.emailId === '') {
        throw new Error('Email is required');
    }
    else if (data.password === 'undefined' || data.password === '') {
        throw new Error('Password is required');
    }
    else if (data.age === 'undefined' || data.age === '') {
        throw new Error('Age is required');
    }
    else if (data.gender === 'undefined' || data.gender === '') {
        throw new Error('Gender is required');
    }
    else if (!validator.isStrongPassword(data.password)) {
        throw new Error('Password is weak');
    }
    else if (!validator.isEmail(data.emailId)) {
        throw new Error('Email is invalid');
    }
};

const validateLoginData = (data) => {
    if (data.emailId === 'undefined' || data.emailId === '') {
        throw new Error('Email is required');
    }
    else if (data.password === 'undefined' || data.password === '') {
        throw new Error('Password is required');
    }
    else if (!validator.isEmail(data.emailId)) {
        throw new Error('Email is invalid');
    }
}

module.exports = {validateSignupData, validateLoginData};