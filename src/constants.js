
module.exports  = {
    URL_LIST :{
        BASE_URL : 'https://api.instagram.com/v1/users',
        AUTH_URL : 'https://api.instagram.com/oauth/authorize/?client_id=609f4f8ae1e44d3aa091ac0f05ae1477&redirect_uri=http://localhost:3000&response_type=token',
        OWNER_INFO_URL : '/self/?access_token=',
        OWNER_RECENT_MEDIA_URL : '/self/media/recent/?access_token=',
        CORS_URL:'https://cors-anywhere.herokuapp.com/',
    },
    ACCESS_TOKEN  : (function(){
        if (typeof(Storage) !== "undefined") {
            if (window.sessionStorage.AUTH_TOKEN) {
                return window.sessionStorage.AUTH_TOKEN
            }
        }
    })(),
    ERROR_MESSAGES:{
        INVALID_CREDENTIALS:'Incorrect username and/or password',
        REQUIRED:'required'
    }
}

