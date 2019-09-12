/**
 * Obtener todos los elementos por el selector de css
 */
var btnEditar = document.querySelectorAll('.btn-editar');
var btnEliminar = document.querySelectorAll('.btn-del');

/**
 * comprobar si existe elementos
 */
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




