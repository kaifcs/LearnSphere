const { createSigner, createVerifier } = require('fast-jwt');

exports.sign = (payload, secret, options = {}) => {
    const signer = createSigner({
        key: secret,
        algorithm: 'HS256',
        expiresIn: options.expiresIn,
    });

    return signer(payload);
};

exports.verify = (token, secret) => {
    const verifier = createVerifier({
        key: secret,
        algorithms: ['HS256'],
    });

    return verifier(token);
};
