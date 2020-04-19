const $itemBlock = document.querySelector('.snipcart-item')

if ($itemBlock) {
    $itemBlock.addEventListener('change', event => {
        if (event.target.classList.contains('count')) {
            setTimeout(function () {
                const saleType = parseInt($itemBlock.querySelector('input[name="saleType"]').value)
                const maxCount = parseInt($itemBlock.querySelector('input[name="maxCount"]').value)
                const basePrice = parseInt($itemBlock.querySelector('input[name="basePrice"]').value)
                const amountInput = $itemBlock.querySelector('input[name="amount"]')
                const quantity = $itemBlock.querySelector('input[name="quantity"]')
                const priceInput = $itemBlock.querySelector('#price')
                const countInput = event.target

                let count = parseInt(countInput.value)

                if (count < 0) {
                    count = 1
                }

                if (count == 0 || isNaN(count)) {
                    count = 1
                }

                if (count > maxCount) {
                    count = maxCount
                }

                if (saleType == 0 && count < 100) {
                    count = 100
                }

                quantity.value = countInput.value = count

                if (saleType) {
                    priceInput.value = amountInput.value = (basePrice * count).toFixed(0)
                } else {
                    priceInput.value = amountInput.value = ((count / 1000) * basePrice).toFixed(0)
                }
            })
        }
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
            const saleType = parseInt(products.querySelector('input[class="saleType"]').value)
            const basePrice = parseInt(products.querySelector('input[class="basePrice"]').value)
            const entryValue = document.querySelector('div[data-id="'+id+'"] div[class="entry value"]')
            const count = parseInt(entryValue.textContent)
            const td = document.querySelector('td[data-id="'+id+'"]')
            let num = 1

            if (saleType == 0) {
                num = 100
            }

            if (event.target.classList.contains('value-plus')) {
                if ((count + num) <= maxCount) {
                    entryValue.textContent = count + num
                }
            } else if (event.target.classList.contains('value-minus')) {
                if ((count - num) > 0) {
                    entryValue.textContent = count - num
                }
            }


            if (saleType) {
                td.textContent = (entryValue.textContent * basePrice).toFixed(0)
            } else {
                td.textContent = ((entryValue.textContent / 1000) * basePrice).toFixed(0)
            }

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