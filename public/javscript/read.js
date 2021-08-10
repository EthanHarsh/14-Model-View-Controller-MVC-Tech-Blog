let title = window.location.href.split('/')[3]

console.log(title);

fetch(`/api/v1/articles/${title}`)
    .then(data => data.json())
    .then(data => {
        if (data.message === `I didn't find anything! 🥲`) {
            $('#preload').remove();
            $('#subtitle').addClass('animate__animated animate__fadeIn');
            $('#subtitle').text('That article does not exist');
        } else {
            data = data.data[0];
            //console.log(data);
            $('#preload').addClass('animate__animated animate__fadeOut')
            $('#preload').remove();
            $('#subtitle').addClass('animate__animated animate__fadeIn');
            $('#subtitle').text(data.subtitle);

            $('#content').addClass('animate__animated animate__fadeIn');
            $('#content').text(data.content);

            let author = `${data.user.first_name} ${data.user.last_name}`
            $('#author').addClass('animate__animated animate__fadeIn');
            $('#author').text(author);

            let stats = JSON.parse(data.stats);
            $('#stats').addClass('animate__animated animate__fadeIn');
            $('#stats').append(`${stats.text}`);
        }
    })