const countInput = document.querySelector('input#count')
const priceInput = document.querySelector('input#price')

if (countInput) {
    countInput.addEventListener('change', event => {
        changeCountAndPrice(event)
    })
}

if (priceInput) {
    priceInput.addEventListener('change', event => {
        changeCountAndPrice(event)
    })
}

const changeCountAndPrice = (event) => {
    const saleType = parseInt(document.getElementById('sale-type').value)
    const maxCount = parseInt(document.getElementById('total-count').value)
    const basePrice = parseInt(document.getElementById('base-price').value)
    const maxPrice = maxCount * basePrice
    let price = parseInt(priceInput.value)
    let count = parseInt(countInput.value)

    if (count == 0) {
        count = 1
        countInput.value = count
    }
    if (count > maxCount) {
        count = maxCount
        countInput.value = count
    }
    if (price == 0) {
        price = basePrice
        priceInput.value = price
    }
    if (price > maxPrice) {
        price = maxPrice
        priceInput.value = price
    }
    if (saleType === 1) {
        countInput.value = count
        priceInput.value = price
    }

    if (event.currentTarget.classList.contains('count')) {
        priceInput.value = count * basePrice
    } else if (event.currentTarget.classList.contains('price')) {
        const value = price / basePrice
        countInput.value = value.toFixed(2)
    }

    document.getElementById('amount').value = priceInput.value
    document.getElementById('cart-count').value = countInput.value
}

function isInt(n) {
    return n % 1 === 0;
}