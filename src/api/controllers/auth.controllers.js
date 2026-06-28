import AuthModels from './../models/auth.models.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await AuthModels.getAdminByEmail(email);
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'El email o la contraseña son incorrectos.'
      });
    }

    const admin = rows[0];
    const matchPassword = await bcrypt.compare(password, admin.password);
    if (!matchPassword) {
      return res.status(404).json({
        message: 'El email o la contraseña son incorrectos.'
      });
    }
    
    req.session.user = {
      id: admin.id,
      email: admin.email,
    }

    return res.status(200).json({
      message: 'Se ha iniciado sesión correctamente.'
    })

  } catch (error) {
    console.log('Error al iniciar sesión: ', error);
    res.status(500).json({
      message: 'Error interno al iniciar sesión'
    });
  }
}