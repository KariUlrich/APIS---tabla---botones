const formCrear = document.querySelector("#form-crear")
const inputNombre = document.querySelector("#nombre")
const inputEmail = document.querySelector("#email")
const inputTelefono = document.querySelector("#telefono")
const inputDireccion = document.querySelector("#direccion")
const formEditar = document.querySelector("#form-editar")
const inputNombreEditar = document.querySelector("#editar-nombre")
const inputEmailEditar = document.querySelector("#editar-email")
const inputTelefonoEditar = document.querySelector("#editar-telefono")
const inputDireccionEditar = document.querySelector("#editar-direccion")
const botonUsuarioEditado = document.querySelector("#boton-usuario-editado")
const botonCrearNuevoUsuario = document.querySelector("#crear-nuevo-usuario")

const modalCrear = document.querySelector(".modal-crear")
const modalEditar = document.querySelector(".modal-editar")
const botonCrearUsuario = document.querySelector(".boton-crear-usuario") 

modalCrear.style.display = "none"
modalEditar.style.display = "none"


botonCrearUsuario.onclick = () => {
    modalCrear.style.display = "flex"

}
botonCrearNuevoUsuario.onclick = () => {
    modalCrear.style.display = "none"
}

// hago el get para tener la info de la Api y ejecuto la funcion de crear tabla en HTML
const obtenerUsuarios = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
  .then((res) =>  res.json())
  .then((data) => {
    crearTablaHTML(data)
  })
}

obtenerUsuarios()


//creo los botones eliminar y ejecuto la funcion de borrar al usuario
const crearBotonesBorrar = () => {
  const botonesBorrar = document.querySelectorAll(".boton-borrar")
    
  for (let i = 0; i < botonesBorrar.length; i++) {
    botonesBorrar[i].onclick = () => {
     const idDelUsuarioABorrar = botonesBorrar[i].dataset.id 
     borrarUsuario(idDelUsuarioABorrar)
    }
  }
}

//creo la funcion de borrar al usuario y ejecuto la funcion GET
const borrarUsuario = (id) => {
  console.log("Borrando usuario", id)
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
    method: "DELETE"
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    obtenerUsuarios()
  })
}

// pongo el valor en el input
const editarUsuario = (id) => {
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      inputDireccionEditar.value = data.address;
      inputEmailEditar.value = data.email;
      inputNombreEditar.value = data.fullname;
      inputTelefonoEditar.value = data.phone;
    });
};

// creo los botones editar, en el click veo el formulario de editar, ejecuto la funcion para que me traiga los valores y hago el put
const crearBotonesEditar = () => {
  const botonesEditar = document.querySelectorAll(".boton-editar")
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].onclick = () => {
     modalEditar.style.display = 'block';
     const idDelUsuarioAEditar = botonesEditar[i].dataset.id 
     editarUsuario(idDelUsuarioAEditar)
     
     
     formEditar.onsubmit =(e) => {
      e.preventDefault()
      fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
       method: "PUT",
       body: JSON.stringify({
       address: inputDireccionEditar.value,
       email: inputEmailEditar.value,
       fullname: inputNombreEditar.value,
       phone: inputTelefonoEditar.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .then((data) => {
  obtenerUsuarios()
  })    
}
}
}
}

// creo tabla en HTML
const crearTablaHTML = (data) => {
  const tabla = document.querySelector("#tabla")
  const html = data.reduce((acc, curr) => {
    return acc + `  
    <tr>
      <td>${curr.fullname}</td>
      <td>${curr.email}</td>
      <td>${curr.address}</td>
      <td>${curr.phone}</td>
      <td>
      <button class="boton-borrar" data-id="${curr.id}"><i class="fas fa-trash-alt"></i></button>
      <button class="boton-editar" data-id="${curr.id}"><i class="far fa-edit"></i></button>
      </td>
    </tr>
    `
  }, `
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Direccion</th>
      <th>Telefono</th>
      <th>Acciones</th>
    </tr>
    `)

    tabla.innerHTML = html
    crearBotonesBorrar()
    crearBotonesEditar()
}

// cuando hago submit al form creo el nuevo usuario y ejecuto la funcion GET
formCrear.onsubmit = (e) => {
  e.preventDefault()

  const nuevoUsuario = {
    fullname: inputNombre.value, 
    phone: inputTelefono.value, 
    address: inputDireccion.value, 
    email: inputEmail.value
  }

  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
    method: "POST", 
    body: JSON.stringify(nuevoUsuario), 
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((res) =>  res.json())
  .then((data) => {
    console.log(data)
    obtenerUsuarios()
  })
}
