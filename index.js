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


// funciones auxiliares 

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

formEditar.style.display = 'none';

// creo la funcion de editar un usuario, ejecuto la funcion de traer la info actualizada y la que me aparezca el value
// const editarUsuario = (id) => {
//   console.log("Usuario editado", id)
//   fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       address: inputDireccionEditar.value,
//       email: inputEmailEditar.value,
//       fullname: inputNombreEditar.value,
//       phone: inputTelefonoEditar.value,
//     }),
//   })
//   .then((res) => res.json())
//   .then((data) => {
//     obtenerUsuarios()
//   })
// }

// botonUsuarioEditado.onclick = () => {
//   obtenerUsuarios();
  
// };

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

// creo los botones editar, en el click veo el formulario de editar, ejecuto la funcion que edita el usuario pasandole el id
const crearBotonesEditar = () => {
  const botonesEditar = document.querySelectorAll(".boton-editar")
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].onclick = () => {
     formEditar.style.display = 'block';
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
     
     //seleccionar el nuevo formulario creado
      //hacerme evento onsubmit 
      //adentro de ese evento leer los valores del form
      //Mandarselo a la funcion editarUsuario 
  //    editarUsuario(idDelUsuarioEditar)
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
      <button class="boton-borrar" data-id="${curr.id}">Borrar usuario</button>
      <button class="boton-editar" data-id="${curr.id}">Editar usuario</button>
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

// creo funcion que carga la info en la tabla y ejecuto la funcion de crear tabla y le paso la data
const obtenerUsuarios = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
  .then((res) =>  res.json())
  .then((data) => {
    console.log(data)
    crearTablaHTML(data)
  })
}

// funciones de eventos 

obtenerUsuarios()

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
