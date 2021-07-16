module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  googleId
) => {
  const errors = {};
  if (username.trim() === '') {
    errors.username = 'Debe indicar un nombre de usuario.';
  }
 
  if (email.trim() === '') {
    errors.email = 'Debe indicar un e-mail.';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Formato de email no válido.';
    }
  }
  if (googleId==="")
  {
    if (password === '') {
      errors.password = 'Debe indicar un password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Los passwords deben coincidir.';
    }
  }


  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email = 'Debe indicar un email.';
  }

    if (password.trim() === '') {
      errors.password = 'Debe indicar un password.';
    }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};