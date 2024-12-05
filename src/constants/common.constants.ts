// Common regex
export const nameRegex = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
export const emailRegex = /\S+@\S+\.\S+/;
export const phoneNumberRegex = /^[6-9]\d{9}$/;

// passwordRegex Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
