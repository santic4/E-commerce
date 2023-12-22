const storage = JSON.parse(localStorage.getItem('carrito'));
const idCarrito = storage._id
const rutaFetch = 'http://localhost:8080/api/carrito/';

document.getElementById('delCarrito').addEventListener('click', deleteCart);

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
                    <th scope="row" style="vertical-align: middle;">${elem.productID.title}</th>
                    <td style="vertical-align: middle;">${elem.productID.description}</td>
                    <td style="vertical-align: middle;">${elem.productID.category}</td>
                    <td style="vertical-align: middle;">${elem.productID.title}</td>
                    <td style="vertical-align: middle;text-align: center;">${elem.cant}</td>
                    <td>
                        <button type="button" id="del${elem._id}" class="action-button" data-action="delete">
                            Eliminar
                        </button>
                        <button type="button" id="upd${elem._id}" class="action-button" data-action="update">
                            Actualizar
                        </button>
                    </td>
                `;
                targetDOM.appendChild(newElement);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}

getCarritoInfo();

function botonera(e) {
    const target = e.target.closest('.action-button');
    if (!target) return;

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
    const value = target.parentElement.previousElementSibling.innerText;
    target.parentElement.previousElementSibling.innerHTML = `
        <input type="text" aria-label="Username" aria-describedby="basic-addon1" id='edit${id}' value="${value}">
    `;
    target.innerHTML = `
        <button type="button" class="action-button save-button" data-action="save" id="sav${id}">
            Guardar
        </button>
    `;
}

function deleteCart() {
    fetch(rutaFetch + idCarrito, {
        method: 'DELETE'
    })
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