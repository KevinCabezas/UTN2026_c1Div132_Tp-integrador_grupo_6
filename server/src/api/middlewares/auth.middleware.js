const validateCredentials = (req, res, next) => {
    const { email, password } = req.body;
    const errores = [];

    // Validacion email
    if (email === undefined || email === null) {
        errores.push('El email es obligatorio.');
    } else if (typeof email !== 'string') {
        errores.push('El email ingresado no es válido.');
    } else {
        const lengthEmail = email.trim().length;
        if (lengthEmail <= 5) {
            errores.push('El email debe tener más de 5 caracteres.');
        } else if (lengthEmail > 50) {
            errores.push('El email no debe superar los 50 caracteres.');
        }
    }

    // Validacion password
    if (password === undefined || password === null) {
        errores.push('La contraseña es obligatoria.');
    } else if (typeof password !== 'string') {
        errores.push('La contraseña ingresada no es válida.');
    } else {
        const lengthPassword = password.trim().length;
        if (lengthPassword <= 7) {
            errores.push('La contraseña debe tener más de 7 caracteres.');
        } else if (lengthPassword > 20) {
            errores.push('La contraseña no debe superar los 20 caracteres.');
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({
            messages: errores
        })
    }
    next();
}

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    next();
}

export {
    validateCredentials,
    requireLogin
}