const idCarrito = JSON.parse(localStorage.getItem('carrito'));
const rutaFetch = 'http://localhost:8080/api/carrito/';
document.getElementById('delCarrito').addEventListener('click', deleteCart);

getCarritoInfo();

function getCarritoInfo() {
    document.getElementById('carritoID').innerText = `Carrito ID ${idCarrito}`;
    const targetDOM = document.getElementById('listaProductos');
    targetDOM.innerHTML = '';
    targetDOM.addEventListener('click', botonera);


    fetch(rutaFetch + idCarrito)
        .then(resp => resp.json())
        .then(data => {
            for (const elem of data.carrito) {
                const newElement = document.createElement('tr');
                newElement.innerHTML = `
                    <th scope="row" style="vertical-align: middle;">${elem.productID.title}</th>
                    <td style="vertical-align: middle;">${elem.productID.description}</td>
                    <td style="vertical-align: middle;">${elem.productID.category}</td>
                    <td style="vertical-align: middle;">${elem.productID.title}</td>
                    <td style="vertical-align: middle;text-align: center;">${elem.cant}</td>
                    <td>
                        <button type="button" id="del${elem._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" id="del${elem._id}" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path id="del${elem._id}" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
                            </svg>
                        </button>
                        <button type="button" id="upd${elem._id}">
                            <svg xmlns="http://www.w3.org/2000/svg" id="upd${elem.productID._id}" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path id="upd${elem.productID._id}" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                            </svg>
                        </button>
                    </td>
                `;
                targetDOM.appendChild(newElement);
            }
        });
}

function botonera(e) {
    const selectedId = e.target.id;
    const action = selectedId.substring(0, 3);
    const id = selectedId.substring(3);

    if (action === 'del') {
        const rutaDelete = rutaFetch + idCarrito + '/product/' + id;
        fetch(rutaDelete, {
            method: 'DELETE'
        })
            .then(resp => resp.json())
            .then(data => {
                getCarritoInfo();
            });
    } else if (action === 'upd') {
        renderEditFilds(e, id);
    } else if (action === 'sav') {
        const valorUpdate = document.getElementById('edit' + id).value;
        const rutaUpdate = rutaFetch + idCarrito + '/product/' + id;
        fetch(rutaUpdate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "cant": parseInt(valorUpdate) })
        })
            .then(resp => resp.json())
            .then(dato => {
                window.location.reload();
            });
    }
}

function renderEditFilds(domElement, id) {
    let targetEdit;
    let targetOrigin;
    let nodo;
    if (domElement.target.nodeName === 'path') {
        nodo = 'path';
        targetOrigin = domElement.target.parentNode.parentNode.parentNode;
        targetEdit = targetOrigin.previousElementSibling;
    }
    if (domElement.target.nodeName === 'svg') {
        nodo = 'svg';
        targetOrigin = domElement.target.parentNode.parentNode;
        targetEdit = targetOrigin.previousElementSibling;
    }
    if (domElement.target.nodeName === 'BUTTON') {
        nodo = 'button';
        targetOrigin = domElement.target.parentNode;
        targetEdit = targetOrigin.previousElementSibling;
    }
    const value = targetEdit.innerText;
    targetEdit.innerHTML = `
        <input type="text" aria-label="Username" aria-describedby="basic-addon1" id='edit${id}' value=${value}>
    `;
    targetOrigin.innerHTML = `
        <button type="button" id="sav${id}">
            <svg id="sav${id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
                <path id="sav${id}" d="M11 2H9v3h2z"/>
                <path id="sav${id}" d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
            </svg>
        </button>
    `;
}

function deleteCart() {
    fetch(rutaFetch + idCarrito, {
        method: 'DELETE'
    })
        .then(resp => resp.json())
        .then(data => {
            window.location = '/';
        });
}

async function buy() {
    try {
  
      const cartId = JSON.parse(localStorage.getItem('carrito'));
      console.log(cartId);
      const response = await fetch(`api/carrito/${cartId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        if (data && data.error) {
          throw new Error(`Error en la solicitud: ${data.error}`);
        } else {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
      }
      const data = await response.json();
  
      if (data) {
  
        alert('Compra exitosa, revisa el mail')

        window.location.href = './productos';

        localStorage.removeItem('carrito');

      } else {
        const errorMessage = data.failedProducts ? 'Productos no disponibles: ' + data.failedProducts.join(', ') : 'Error desconocido en la compra';
        alert('Error en la compra. ' + errorMessage);
      }
    } catch (error) {
      console.error('Error en la compra:', error.message);
      alert('Error en la compra. Consulta la consola para más detalles.');
    }
  }
  
  async function buyComplete() {
  
    try {
      await buy();
    } catch (error) {
      console.error('Error general:', error);
      alert('Error general en la compra. Consulta la consola para más detalles.');
    }
}