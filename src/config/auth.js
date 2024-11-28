// Configuración de autenticación
export const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NzIxNGU1ZGQ3ZDU1OTc2MTAxZGQxZDgiLCJpYXQiOjE3MzI0MDk0MzgsImV4cCI6MTczMjQ0NTQzOH0.b_R0_UvMEXB9hUqQ0VdpdGvlkjFQYqpK_G0TAc6iRUE';

// Inicializar token en localStorage
export const initializeAuth = () => {
  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', AUTH_TOKEN);
  }
};