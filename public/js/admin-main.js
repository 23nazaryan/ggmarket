const $select = document.querySelector('.category-select')

if ($select) {
    const id = $select.dataset.id
    const option = document.getElementById(id)

    if (option) {
        option.setAttribute('selected', 1)
    }
}

const $categorySelect = document.getElementById('products-category')

if ($categorySelect) {
    $categorySelect.addEventListener('change', event => {
        const id =event.currentTarget.value
        window.location.href = '/admin/products/category/'+id
    })
}

const $form = document.querySelector('form')

if ($form) {
    $form.addEventListener('click', event => {
        if (event.target.classList.contains('checkbox')) {
            const checkbox = event.target

            if (checkbox.value == 1 || checkbox.hasAttribute('checked')) {
                checkbox.value = 0
                checkbox.removeAttribute('checked')
            } else {
                checkbox.value = 1
            }

            if (checkbox.dataset.type === 'sale') {
                const div = document.querySelector('div.new_price');

                if (div) {
                    if (checkbox.value == 1) {
                        div.style.display = 'block'
                    } else {
                        div.style.display = 'none'
                    }
                }
            }
        }
    })
}

const addType = document.querySelector('.add-type')

if (addType) {
    addType.addEventListener('click', event => {
        const type = document.querySelector('.add-input').value

        if (type) {
            const types = document.querySelector('.added-types')
            const innerInput = types.lastChild
            let idx = parseInt(innerInput.value ? innerInput.dataset.idx : 0) + 1
            const input = document.createElement('input')

            input.type = 'text'
            input.className = 'form-control'
            input.name = 'types'
            input.value = type
            input.dataset.idx = idx
            input.style.marginBottom = '15px'
            types.appendChild(input)
            document.querySelector('.add-input').value = ''
        }
    })
}