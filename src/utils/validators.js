export function validatePAN(pan) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
}

export function validateAadhaar(num) {
  return /^[0-9]{12}$/.test(num);
}