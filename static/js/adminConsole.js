
document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    fetch('/api/products', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al crear el producto.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto creado exitosamente:', data);
        
    })
    .catch(error => {
        console.error('Error al crear el producto:', error);
        
    });
});
