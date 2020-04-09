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

const typeSelect = document.querySelector('select[name="types"')

if (typeSelect) {
    typeSelect.addEventListener('change', event => {
        document.querySelector('input[name="type"]').value = event.currentTarget.value
        document.querySelector('input[name="typeId"]').value = event.target.options[event.target.selectedIndex].id
    })
}

const quantitySelects = document.querySelectorAll('.quantity-select')

if (quantitySelects) {
    quantitySelects.forEach(select => {
        select.addEventListener('click', event => {
            const id = event.currentTarget.getAttribute('data-id')
            const products = document.querySelector('products div[data-id="'+id+'"]')
            const maxCount = parseInt(products.querySelector('input[class="maxCount"]').value)
            const basePrice = parseInt(products.querySelector('input[class="basePrice"]').value)
            const entryValue = document.querySelector('div[data-id="'+id+'"] div[class="entry value"]')
            const count = parseInt(entryValue.textContent)
            const td = document.querySelector('td[data-id="'+id+'"]')

            if (event.target.classList.contains('value-plus')) {
                if ((count + 1) <= maxCount) {
                    entryValue.textContent = count + 1
                }
            } else if (event.target.classList.contains('value-minus')) {
                if ((count -1) > 0) {
                    entryValue.textContent = count - 1
                }
            }

            td.textContent = entryValue.textContent * basePrice
            products.querySelector('input[class="count"]').value = entryValue.textContent
            products.querySelector('input[class="amount"]').value = td.textContent

            const amountInputs = document.querySelectorAll('input[class="amount"]')
            let amounts = 0

            amountInputs.forEach(input => {
                amounts += parseInt(input.value)
            })

            document.querySelector('.total-amount').textContent = amounts
        })
    })
}

const deleteButtons = document.querySelectorAll('.delete')

if (deleteButtons) {
    deleteButtons.forEach(button => {
        button.addEventListener('click', event => {
            const id = event.currentTarget.dataset.id
            const name = event.currentTarget.dataset.name
            const row = document.querySelector('tr[data-id="'+id+'"]')
            const product = document.querySelector('products div[data-id="'+id+'"]')
            const amount = parseInt(product.querySelector('input[class="amount"]').value)
            const totalAmount = parseInt(document.querySelector('.total-amount').textContent)
            const minicartButton = document.querySelector('.minicart-remove[data-minicart-item_name="'+name+'"]')
            const idx = minicartButton.getAttribute('data-minicart-idx')
            paypal.minicart.cart.remove(idx)
            row.remove()
            product.remove()
            document.querySelector('.total-amount').textContent = totalAmount - amount

            if (document.querySelectorAll('products div').length === 0) {
                window.location.href = '/'
            }
        })
    })
}