
/**
 * Obtener todos los elementos por el selector de css
 */
let btnEditar = document.querySelectorAll('.btn-editar');
let btnEliminar = document.querySelectorAll('.btn-del');
let selectDep= document.getElementById('departamntoId');
let selectEst= document.getElementById('establecimientoId');
let btnBuscar= document.getElementById('btnBuscar');
/**
 * comprobar si existe elementos
 */
selectDep.addEventListener('change', cargarSelect);
async function cargarSelect(e) {  
   let id= selectDep.value;
   const data= await axios.get(`/establecimiento/${id}`);
   console.log(data);
   $("#establecimientoId").empty();
   $("#establecimientoId").append("<option value='T'>Todos</option>");
   for (item in data.data){
    $("#establecimientoId").append("<option value='"+data.data[item].codigo_establecimiento+"'>"+data.data[item].nombre_establecimiento+"</option>");
   }  
};
btnBuscar.addEventListener('click', cargarTabla);
async function cargarTabla(e) {  
    let id= selectDep.value;
    const data= await axios.get(`/establecimiento_all/${id}`);
    /*console.log(data);
    $("#establecimientoId").empty();
    $("#establecimientoId").append("<option value='T'>Todos</option>");
    for (item in data.data){
     $("#establecimientoId").append("<option value='"+data.data[item].codigo_establecimiento+"'>"+data.data[item].nombre_establecimiento+"</option>");
    }  */
 };


if (btnEditar) {
    const btnArray = Array.from(btnEditar);
    btnArray.forEach((btn) => {
        btn.addEventListener('click', alerta);
    });
}

function alerta(e) {
    if (!confirm('Desea editar?')) {
        e.stopPropagation();
    }
}

if (btnEliminar) {
    const btnArray = Array.from(btnEliminar);
    btnArray.forEach((btn) => {
        btn.addEventListener('click', alertaDel);
    });
}

function alertaDel(e) {
    if (!confirm('Desea eliminar?')) {
        e.preventDefault();
        e.stopPropagation();
    }
}




