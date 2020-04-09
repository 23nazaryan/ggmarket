const countInput = document.querySelector('input#count')

if (countInput) {
    countInput.addEventListener('change', event => {
        const maxCount = parseInt(document.querySelector('input[name="maxCount"]').value)
        const basePrice = parseInt(document.getElementById('base-price').value)
        let count = parseInt(event.currentTarget.value)

        if (count === 0 || !count) {
            count = 1
        }
        if (count > maxCount) {
            count = maxCount
        }

        event.currentTarget.value = count
        document.querySelector('input#price').value = count * basePrice
        document.querySelector('input[name="quantity"]').value = countInput.value
    })
}

const minicartQuantity = document.querySelector('.minicart-details-quantity .minicart-quantity')

if (minicartQuantity) {
    minicartQuantity.addEventListener('click', event => {
        alert('ok')
    })
}

const typeSelect = document.querySelector('select[name="types"')

if (typeSelect) {
    typeSelect.addEventListener('change', event => {
        document.querySelector('input[name="type"]').value = event.currentTarget.value
        document.querySelector('input[name="typeId"]').value = event.target.options[event.target.selectedIndex].id
    })
}

const deleteButtons = document.querySelectorAll('.delete')

if (deleteButtons) {
    deleteButtons.forEach(button => {
        button.addEventListener('click', event => {
            const id = event.currentTarget.dataset.id
            const row = document.querySelector('tr[data-id="'+id+'"]')
            const product = document.querySelector('div[data-product-id="'+id+'"]')
            row.style.display = 'none'
            product.remove()

            if (document.querySelectorAll('products div').length === 0) {
                window.location.href = '/'
            }
        })
    })
}