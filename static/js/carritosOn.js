const rutaFetch = 'http://localhost:8080/api/carrito/carritoOn';
const rutaFetchNewCarrito = 'http://localhost:8080/api/carrito';

document.getElementById('newCarrito').addEventListener('click', newCarrito);

function loadCarritos() {
    fetch(rutaFetch)
        .then(resp => {
            // Verificar si la respuesta es un error 404
            if (!resp.ok) {
                throw new Error(`Error al cargar carritos. Código de estado: ${resp.status}`);
            }
            return resp.json();
        })
        .then(data => {
            const targetDOM = document.getElementById('listaCarritos');
            targetDOM.addEventListener('click', selectCarrito);
            targetDOM.innerHTML = '';

            if (data.length > 0) {
                for (const elem of data) {
                    const newElement = document.createElement('tr');
                    newElement.innerHTML = `
                        <th scope="row" style="vertical-align: middle;">${elem._id}</th>
                        <td style="vertical-align: middle;">Subtotal: ${elem.total}</td>
                        <td style="vertical-align: middle;">
                            <input type="radio" class="btn-check" name="options-outlined" id=${elem._id} autocomplete="off">
                            <label class="btn btn-outline-success" for="success-outlined" id=${elem._id}>Continuar</label>
                        </td>
                    `;
                    targetDOM.appendChild(newElement);
                }
            } else {
                targetDOM.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        No hay carritos activos. ¡Crea uno nuevo!
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error al cargar carritos:', error);
            // Manejar el error al cargar carritos según sea necesario.
        });
}

loadCarritos();

function selectCarrito(e) {
    if (e.target.id !== '') {
        document.getElementById('carritosActivos').value = e.target.id;
        localStorage.setItem('carrito', JSON.stringify(e.target.id));
        window.location = '/productos';
    }
}

function newCarrito(e) {
    fetch(rutaFetchNewCarrito, {
        method: 'POST',
    })
        .then(res => {
            // Verificar si la respuesta es un error 404
            if (!res.ok) {
                throw new Error(`Error al crear un nuevo carrito. Código de estado: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
       
            const newID = data._id;
          
            // Ahora, debemos enviar la solicitud para obtener el carrito recién creado con sus detalles.
            fetch(`http://localhost:8080/api/carrito/${newID}`)
                .then(resp => {
                    // Verificar si la respuesta es un error 404
                    if (!resp.ok) {
                        throw new Error(`Error al obtener detalles del nuevo carrito. Código de estado: ${resp.status}`);
                    }
                    return resp.json();
                })
                .then(carritoData => {
                    // Aquí asumimos que 'carritoData' contiene los detalles del carrito recién creado.
                    // Puedes adaptar esto según la respuesta real del servidor.

                    // Almacenamos el carrito en el almacenamiento local del navegador.
                    localStorage.setItem('carrito', JSON.stringify(carritoData._id));

                    // Redirigimos a la página de productos.
                    window.location = '/productos';
                })
                .catch(error => {
                    console.error('Error al obtener detalles del nuevo carrito:', error);
                    // Manejar el error al obtener detalles del carrito según sea necesario.
                });
        })
        .catch(error => {
            console.error('Error al crear un nuevo carrito:', error);
            // Manejar el error al crear un nuevo carrito según sea necesario.
        });
}