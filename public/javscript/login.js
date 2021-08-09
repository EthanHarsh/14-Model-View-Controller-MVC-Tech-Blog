$('#loginbtn').click(() => {
    console.log('click');
    console.log($('#password').val());
    let user = {
        email: $('#email').val(),
        password: $('#password').val()
    }
    $('#login-form').addClass('animate__animated animate__fadeOut');
    fetch('/api/v1/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(data => data.json())
        .then(data => {
            $('#main').removeClass('animate__fadeIn');
            $('#vid-contain').removeClass('animate__fadeIn');
            $('#main').addClass('animate__fadeOut');
            $('#vid-contain').addClass('animate__fadeOut');
            setTimeout(() => {
                window.location.href = `/`;
            }, 500)
        });
})