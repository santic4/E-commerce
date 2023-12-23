const idCarrito = JSON.parse(localStorage.getItem('carrito'));
const rutaFetch = 'http://localhost:8080/api/carrito/';

document.getElementById('delCarrito').addEventListener('click', deleteCart);

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
      console.log(`aca esta la data : ${data}`);
      for (const elem of data.carrito) {
        const newElement = document.createElement('tr');
        newElement.innerHTML = `
          <th scope="row" style="vertical-align: middle;">${elem.productID.title}</th>
          <td style="vertical-align: middle;">${elem.productID.description}</td>
          <td style="vertical-align: middle;">${elem.productID.category}</td>
          <td style="vertical-align: middle;">${elem.productID.title}</td>
          <td style="vertical-align: middle;text-align: center;">${elem.cant}</td>
          <td>
            <button type="button" id="del${elem.productID._id}" class="action-button" data-action="delete" data-id="${elem.productID._id}">
              Eliminar
            </button>
            <button type="button" id="upd${elem.productID._id}" class="action-button" data-action="update" data-id="${elem.productID._id}">
              Actualizar
            </button>
          </td>
        `;
        targetDOM.appendChild(newElement);
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
}

getCarritoInfo();

function botonera(e) {
  const target = e.target.closest('.action-button');
  if (!target) return;

  console.log(`target: ${target}`);

  // Captura el idProduct desde data-id o el atributo data-id del botón
  const idProduct = target.dataset.id || target.getAttribute('data-id');
  console.log(`idProduct: ${idProduct}`);

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
  
  function renderEditFilds(target, idProduct) {
    const value = target.parentElement.previousElementSibling.innerText;
    target.parentElement.previousElementSibling.innerHTML = `
        <input type="text" aria-label="Username" aria-describedby="basic-addon1" id='edit${idProduct}' value="${value}">
    `;
    target.innerHTML = `
        <button type="button" class="action-button save-button" data-action="save" data-id="${idProduct}">
            Guardar
        </button>
    `;
  
    // Agregar event listener al botón de guardar
    const saveButton = target.querySelector('.save-button');
    saveButton.addEventListener('click', () => handleSaveButtonClick(idProduct));
    
  }
  
  function handleSaveButtonClick(id) {
    // Obtén la nueva cantidad desde el input
    const newValue = document.getElementById(`edit${id}`).value;
  
    // Construye la URL de actualización
    console.log(`este es el  id ${id}`)
    console.log(`este es el  newValue ${newValue}`)
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
