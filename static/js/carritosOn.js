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
        //document.getElementById('carritosActivos').value = e.target.id;
        localStorage.setItem('carrito', JSON.stringify(e.target.id));
        window.location = '/productos';
    }
}

async function newCarrito(e) {

    try {
  
      const res = await fetch('http://localhost:8080/api/sessions/current',
        {
          method: 'GET'
        })
      if (res.status !== 200) {
        alert('necesitas loguearte para ver esta info!')
        return (window.location.href = '/login')
      }
  
      const result = await res.json()
      const usuario = result.payload
      const user = usuario.username
      console.log(user)
      
      const response = await fetch('http://localhost:8080/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user }),
      });
  
      if (response.ok) {
        // El mensaje se ha enviado correctamente
        console.log('Mensaje enviado con éxito');
  
        const newID = response._id
        console.log(newID)
        localStorage.setItem('carrito', JSON.stringify(newID))
        window.location = '/productos'
  
      } else {
        console.error('Error al enviar el mensaje:', response.status)
  
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  
  }
/*
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
          
            fetch(`http://localhost:8080/api/carrito/${newID}`)
                .then(resp => {
                    // Verificar si la respuesta es un error 404
                    if (!resp.ok) {
                        throw new Error(`Error al obtener detalles del nuevo carrito. Código de estado: ${resp.status}`);
                    }
                    return resp.json();
                })
                .then(carritoData => {
        
                    localStorage.setItem('carrito', JSON.stringify(carritoData._id));

                    window.location = '/productos';
                })
                .catch(error => {
                    console.error('Error al obtener detalles del nuevo carrito:', error);
                });
        })
        .catch(error => {
            console.error('Error al crear un nuevo carrito:', error);
        });
}
*/