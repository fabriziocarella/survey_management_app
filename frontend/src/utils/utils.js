export const checkRegex = (str, type) => {
    let regex
    if (type === 'email') {
        regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    } else if (type === 'password') {
        regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
    } else if (type === 'dni') {
        regex = /^(0[1-9]|[1-9][0-9])\d{7}[A-Za-z]$|^[XYZ]\d{7}[A-Za-z]$/
    }
    return regex.test(str)
}

export const checkIfEmpty = (arr) => {
    return Object.values(arr).every(field => field !== '')
}