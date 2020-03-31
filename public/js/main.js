const $form = document.querySelector('form.register')

if ($form) {
	$form.addEventListener('click', event => {
		if (event.target.classList.contains('form-check-input')) {
			const id = event.target.value
			const csrf = $form.querySelector('.csrf').value

			fetch('/register/change-employee', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'X-XSRF-TOKEN': csrf
				},
				body: JSON.stringify({
					id: id
				})
			})
            .then(res => res.json())
            .then(dateTime => {
                if (dateTime.length) {
                    let html = "<select name='date' class='custom-select'>"
                    html += dateTime.map(d => {
                        return `<option>${d}</option>`
                    })
                    html += "</select>"
                    const freeDays = $form.querySelector('.free-days')
                    freeDays.style.display = 'block'
                    freeDays.innerHTML = html
                }
            })
		}
	})
}

/*
$('#clients').change(function(){
	let cat = $(this).val();
	$.ajax({
		type: 'POST',
		url: '/site/',
		data: {cat: cat},
		success: function(cat){
			$('.clients-table').html(cat).show();
		},
		error: function(){
			console.log('error');
		}
	});
});*/
