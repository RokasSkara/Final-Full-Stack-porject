/* Validates login/register data to match required pattern */

import Ajv from 'ajv'

const ajv = new Ajv()

const CredSchema = {
    type: "object",
    properties: {
        email: { type: "string", pattern: '[a-z0-9]+@[a-zA-z]+\.[a-z]{2,3}' },
        password: { type: "string", pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$' },
    },
    required: ["email", "password"],
}

const validate = ajv.compile(CredSchema)

let CredentialValidation = (data) => {
    const valid = validate(data)
    return valid
}

export default CredentialValidation