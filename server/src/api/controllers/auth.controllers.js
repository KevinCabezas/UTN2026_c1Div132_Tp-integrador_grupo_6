import AuthModels from './../models/auth.models.js';
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [adminRegistrado] = await AuthModels.getAdminByEmail(email);
    if (adminRegistrado.length === 0) {
      return res.status(404).json({
        message: 'El email o la contraseña son incorrectos.'
      });
    }

    const admin = adminRegistrado[0];
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

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [adminRegistrado] = await AuthModels.getAdminByEmail(email);
    if (adminRegistrado.length === 0) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const [rows] = await AuthModels.createAdmin(email, hashedPassword);
      return res.status(201).json({
        message: `Usuario registrado con éxito.`
      });
    }
    return res.status(404).json({
      message: 'El email ya está registrado.'
    });
  } catch (error) {
    console.log('Error al registrarse: ', error);
    res.status(500).json({
      message: 'Error interno al registrarse'
    });
  }
}

export const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log('Error al destruir la sesion: ', error);
      return res.status(500).json({
        message: 'Error al cerrar la sesion.'
      });
    }
    return res.status(200).json({
      message: 'Sesión cerrada con éxito.'
    })
  })
}