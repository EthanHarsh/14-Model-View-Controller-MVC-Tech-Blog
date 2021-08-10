$('#nav-home').addClass('active');

fetch('/api/v1/articles/topics')
    .then(data => data.json())
    .then(data => {
        data = data.data;
        $('#topic-list').empty();
        data.forEach(el => {
            $('#topic-list').append(`<li class="animate__animated animate__fadeIn filter-choices">${el.topic}</li>`)
        })
    })

fetch('/api/v1/articles/page')
    .then(data => data.json())
    .then(data => {
        console.log(data.data.rows);
        data = data.data.rows;
        $('#article-list').empty();
        data.forEach(el => {
            $('#article-list').append(`<li id="article-${el.id}" class="articles border-grey p-1 grey-text text-lighten-3 corner-med first-article"><h3 class="zero roboto three article-text">${el.title}</h3><h6 class="charter article-text">${el.subtitle}</h6></li>`)
            let spot_id = `#article-${el.id}`;
            let title = el.title
            $(spot_id).click(() => {
                $('#main').removeClass('animate__fadeIn');
                $('#vid-contain').removeClass('animate__fadeIn');
                $('#main').addClass('animate__fadeOut');
                $('#vid-contain').addClass('animate__fadeOut');
                setTimeout(() => {
                    window.location.href = `/${title}`;
                }, 500)
            })
        })
    })

fetch('/api/v1/articles/featured')
    .then(data => data.json())
    .then(data => {
        data = data.data;
        $('#featured-list').empty();
        let i = 0;
        data.forEach(el => {
            $('#featured-list').append(`<li class="animate__animated animate__fadeIn filter-choices" id="featured-${i}">${el.title}</li>`)
            let spot_id = `#featured-${i}`
            let title = el.title
            $(spot_id).click(() => {
                $('#main').removeClass('animate__fadeIn');
                $('#vid-contain').removeClass('animate__fadeIn');
                $('#main').addClass('animate__fadeOut');
                $('#vid-contain').addClass('animate__fadeOut');
                setTimeout(() => {
                    window.location.href = `/${title}`;
                }, 500)
            })
            i++;
        })
    })