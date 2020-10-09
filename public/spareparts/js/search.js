function getUsers(searchinput){
    $.ajax({
            url: '/search-pokemon',
            type: 'GET',
            success: function(result){
                    window.location.reload(true);
            }
    })
};