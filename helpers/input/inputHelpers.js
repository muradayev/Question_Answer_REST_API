const bcrypt = require("bcryptjs")

const validateUserInput = (email, password) => {
    return email && password
}

const comparePassword = async (password, hashedPassword) => {
    const result = await bcrypt.compare(password, hashedPassword)
    return result
}

module.exports = {
    validateUserInput,
    comparePassword
}