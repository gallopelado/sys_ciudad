const datos_sesion = {}

function obtener(user, email){
    if(user != "" && email != ""){
        data = {
            user: user,
            email: email
        }
        return data;
    }    
    //console.log(data);    
    //return data;
}

datos_sesion.obtener = obtener;

module.exports = datos_sesion;