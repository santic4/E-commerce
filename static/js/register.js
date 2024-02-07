const idCarrito = JSON.parse(localStorage.getItem('carrito'))
console.log(idCarrito)
document.getElementById('carritoID').value= idCarrito

// Verificar si el elemento con ID "register" existe
const formLogin = document.getElementById('register');

if (formLogin) {
  // Intentar parsear el contenido de localStorage
  try {
    const idCarrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(idCarrito);
  } catch (error) {
    console.error('Error al parsear JSON desde localStorage:', error);
  }

  // Agregar evento al formulario
  formLogin.addEventListener('submit', async event => {
    event.preventDefault();

    // @ts-ignore
    const formDataEncoded = new URLSearchParams(new FormData(formLogin));

    try {
      const res = await fetch(
        '/api/users',
        {
          method: 'POST',
          body: formDataEncoded,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
      );

      // Verificar si la solicitud fue exitosa (código de respuesta 2xx)
      if (res.ok) {
        window.location.href = '/login';
      } else {
        // Mostrar detalles de la respuesta no exitosa en la consola
        console.log('La solicitud no fue exitosa. Código de respuesta:', res.status);
        console.log('Respuesta del servidor:', await res.text());
      }
    } catch (err) {
      console.error('Error en la solicitud fetch:', err);
    }
  });
} else {
  console.error('No se encontró el elemento con ID "register"');
}
