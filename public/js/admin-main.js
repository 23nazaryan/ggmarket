const $select = document.querySelector('.category-select')

if ($select) {
    const id = $select.dataset.id
    console.log(id)
    const option = document.getElementById(id)

    if (option) {
        option.setAttribute('selected', 1)
    }
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