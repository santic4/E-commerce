const storage = JSON.parse(localStorage.getItem('carrito'));
const idCarrito = storage._id
const rutaFetch = 'http://localhost:8080/api/carrito/';

document.getElementById('delCarrito').addEventListener('click', deleteCart);

<<<<<<< HEAD
console.log(idCarrito);

function getCarritoInfo() {
  document.getElementById('carritoID').innerText = `Carrito ID ${idCarrito}`;
  const targetDOM = document.getElementById('listaProductos');
  targetDOM.innerHTML = '';
  targetDOM.addEventListener('click', botonera);


  fetch(rutaFetch + idCarrito)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Error en la solicitud. Código de estado: ${resp.status}`);
      }
      return resp.json();
    })
    .then((data) => {
      for (const elem of data.carrito) {
        const newElement = document.createElement('tr');
        newElement.innerHTML = `
=======
console.log(idCarrito)

function getCarritoInfo() {

    document.getElementById('carritoID').innerText = `Carrito ID ${idCarrito}`;
    const targetDOM = document.getElementById('listaProductos');
    targetDOM.innerHTML = '';
    targetDOM.addEventListener('click', botonera);

    fetch(rutaFetch + idCarrito)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Error en la solicitud. Código de estado: ${resp.status}`);
            }
            return resp.json();
        })
        .then(data => {
            for (const elem of data.carrito) {
                const newElement = document.createElement('tr');
                newElement.innerHTML = `
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323
                    <th scope="row" style="vertical-align: middle;">${elem.productID.title}</th>
                    <td style="vertical-align: middle;">${elem.productID.description}</td>
                    <td style="vertical-align: middle;">${elem.productID.category}</td>
                    <td style="vertical-align: middle;">${elem.productID.title}</td>
                    <td style="vertical-align: middle;text-align: center;">${elem.cant}</td>
                    <td>
<<<<<<< HEAD
                        <button type="button" id="del${elem._id}" class="action-button" data-action="delete" data-id="${elem._id}">
                            Eliminar
=======
                        <button type="button" id="del${elem._id}" class="action-button" data-action="delete">
                            Eliminar
                        </button>
                        <button type="button" id="upd${elem._id}" class="action-button" data-action="update">
                            Actualizar
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323
                        </button>
                        <button type="button" id="upd${elem._id}" class="action-button" data-action="update" data-id="${elem._id}">
                        Actualizar
                    </button>
                    </td>
                `;
<<<<<<< HEAD
        targetDOM.appendChild(newElement);
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
=======
                targetDOM.appendChild(newElement);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323
}

getCarritoInfo();

function botonera(e) {
    const target = e.target.closest('.action-button');
    if (!target) return;
<<<<<<< HEAD
  
    const idProduct = target.dataset.id; // Obtener el ID del producto directamente desde el atributo de datos
  
    if (idProduct === undefined) {
      console.error('ID del producto indefinido. No se puede procesar la eliminación.');
      return;
    }
  
    const action = target.getAttribute('data-action');
  
    if (action === 'delete') {
      const rutaDelete = rutaFetch + idCarrito + '/product/' + idProduct;
      fetch(rutaDelete, {
        method: 'DELETE',
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(`Error al eliminar el producto. Código de estado: ${resp.status}`);
          }
          return resp.json();
        })
        .then((data) => {
          getCarritoInfo();
        })
        .catch((error) => {
          console.error('Error al procesar la eliminación:', error);
        });
    } else if (action === 'update') {
      renderEditFilds(target, idProduct);
    }
  }
  
  function renderEditFilds(target, id) {
=======

    const selectedId = target.id;
    const action = target.getAttribute('data-action');
    const id = selectedId.substring(3);

    if (action === 'delete') {
        const rutaDelete = rutaFetch + idCarrito + '/product/' + id;
        fetch(rutaDelete, {
            method: 'DELETE'
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(`Error al eliminar el producto. Código de estado: ${resp.status}`);
                }
                return resp.json();
            })
            .then(data => {
                getCarritoInfo();
            })
            .catch(error => {
                console.error('Error al procesar la eliminación:', error);
            });
    } else if (action === 'update') {
        renderEditFilds(target, id);
    }
}

function renderEditFilds(target, id) {
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323
    const value = target.parentElement.previousElementSibling.innerText;
    target.parentElement.previousElementSibling.innerHTML = `
        <input type="text" aria-label="Username" aria-describedby="basic-addon1" id='edit${id}' value="${value}">
    `;
    target.innerHTML = `
<<<<<<< HEAD
        <button type="button" class="action-button save-button" data-action="save" data-id="${id}">
=======
        <button type="button" class="action-button save-button" data-action="save" id="sav${id}">
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323
            Guardar
        </button>
    `;
  
    // Agregar event listener al botón de guardar
    const saveButton = target.querySelector('.save-button');
    saveButton.addEventListener('click', () => handleSaveButtonClick(id));
  }
  
  function handleSaveButtonClick(id) {
    // Obtén la nueva cantidad desde el input
    const newValue = document.getElementById(`edit${id}`).value;
  
    // Construye la URL de actualización
    const rutaUpdate = `${rutaFetch}${idCarrito}/product/${id}`;
  
    // Realiza la petición PUT con la nueva cantidad
    fetch(rutaUpdate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cant: newValue,
      }),
    })
<<<<<<< HEAD
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`Error al actualizar el producto. Código de estado: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        // Puedes manejar la respuesta según tus necesidades
        console.log('Producto actualizado:', data);
        getCarritoInfo(); // Actualiza la interfaz después de la actualización
      })
      .catch((error) => {
        console.error('Error al procesar la actualización:', error);
      });
  }
  
function deleteCart() {
  fetch(rutaFetch + idCarrito, {
    method: 'DELETE',
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Error al eliminar el carrito. Código de estado: ${resp.status}`);
      }
      return resp.json();
    })
    .then((data) => {
      window.location = '/';
    })
    .catch((error) => {
      console.error('Error al procesar la eliminación del carrito:', error);
    });
}
=======
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Error al eliminar el carrito. Código de estado: ${resp.status}`);
            }
            return resp.json();
        })
        .then(data => {
            window.location = '/';
        })
        .catch(error => {
            console.error('Error al procesar la eliminación del carrito:', error);
        });
}
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323
