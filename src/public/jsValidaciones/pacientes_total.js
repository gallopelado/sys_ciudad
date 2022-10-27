
/**
 * Obtener todos los elementos por el selector de css
 */
let btnEditar = document.querySelectorAll('.btn-editar');
let btnEliminar = document.querySelectorAll('.btn-del');
let selectDep= document.getElementById('departamntoId');
let selectEst= document.getElementById('establecimientoId');
let btnBuscar= document.getElementById('btnBuscar');
let inputDesde =document.getElementById('datepicker_desde');
let inputhasta = document.getElementById('datepicker_hasta');
if(!inputDesde.value && !inputhasta.value){
    let date = new Date();
    date=moment(date).format('MM/DD/YYYY');
    inputDesde.value= date;
    inputhasta.value=date;
}
/**
 * comprobar si existe elementos
 */
selectDep.addEventListener('change', cargarSelect);
async function cargarSelect(e) {  
   Notiflix.Block.Circle('.main-content', 'Recuperando Deparatamentos');
    try {
        let id= selectDep.value;
        const data= await axios.get(`/establecimiento/${id}`);
        console.log(data)
        if (data.data.length >0) {
            $("#establecimientoId").empty();
            $("#establecimientoId").append("<option value='T'>Todos</option>");
            for (item in data.data){
                $("#establecimientoId").append("<option value='"+data.data[item].codigo_establecimiento+"'>"+data.data[item].nombre_establecimiento+"</option>");
            }
        }
        else {
            $("#establecimientoId").empty();
            $("#establecimientoId").append("<option value='T'>Todos</option>");
        }
    } catch (error) {
        console.log(error);
    } finally {
        Notiflix.Block.Remove(".main-content");
    }
   
  // console.log(data);
     
};
btnBuscar.addEventListener('click', cargarTabla);
async function cargarTabla(e) {  
    let dep= selectDep.value;
    let est= selectEst.value;
    let desde= inputDesde.value;
    let hasta =inputhasta.value;

    const data= await axios.get('/establecimiento_all',{
        params: {
            departamento: dep,
            establecimiento:est,
            datepicker_desde:desde,
            datepicker_hasta:hasta
        }
      })
    console.log(data);
    $("#tBody").empty();
    let tBody=``;
    for (item in data.data){
        tBody+=`<tr>
        <td>${data.data[item].codigo_establecimiento}</td>
        <td>${data.data[item].nombre_departamento}</td>
        <td>${data.data[item].nombre_establecimiento}</td>
        <td>${data.data[item].total}</td>
        <td>
            <a href="/ciudad/mod/<%= valor.id %>" class="btn btn-warning btn-sm btn-editar" onclick="return false;"><i
                    class="fa fa-edit"></i>historial</a>
            <a href="/ciudad/del/<%= valor.id %>" class="btn btn-danger btn-sm btn-del"><i
                    class="fa fa-eraser"></i> calcular</a>
        </td>
    </tr>`;
    }  
    $("#tBody").append(tBody);
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




