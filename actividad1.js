//..........ZONA DECLARATIVA...........//
 

//Estas variables se usan en la función subirArchivo();
//cada imagen predeterminada se guarda en una variable de la clase Image
const imagen1 = (new Image().src = "logos/logoGoogle.png");
const imagen2 = (new Image().src = "logos/logoMeta.png");
const imagen3 = (new Image().src = "logos/logoMicrosoft.png");
const imagen4 = (new Image().src = "logos/logoApple.png");


//..........ZONA EJECUTIVA...........//

/* ---   FUNCIONES PEQUEÑAS PARA COSAS SIMPLES Y/O QUE VAN DENTRO DE OTRAS FUNCIONES --- */

// Función para comprobar si el dato pasado por parámetro son todo números. 

function sonNumeros(datos) {

  /*Este método coge un string, y reemplaza todos los números por espacios. Después se cuenta la longitud de la nueva cadena, por lo que si no tiene la misma longitud 
que la cadena original, significa que por lo menos hay un carácter que no es un número. 
Es decir, devuelve la cantidad de números que hay en el string.
Si da 0, no hay ningún número

Véase: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace */
  return datos.replace(/[^0-9]/g, "").length;

}

// recorre un dato, y se le pone el caracter a buscar. Devuelve el número de veces que aparece ese caracter ...retorna un número

function contarCaracteres(dato, caracterBuscado) {

  var contador = 0;

  var contador = dato.split(caracterBuscado).length - 1;

  return contador;
}

// determina el tipo de proveedor del email: gmail,hotmail ...retorna true o false 
function tipoCuentaEmail(dato, proveedor) {

  var valido = false;

  var posicionArroba = dato.indexOf("@");

  var despuesArroba = dato.slice(posicionArroba + 1, dato.lastIndexOf(".") + 1);

  if (despuesArroba === proveedor) {
    valido = true;
  }

  return valido;
}

// determina la terminación del email: "es" o "com" ...retorna true o false 
function terminacionEmail(dato, final) {

  var valido = false;

  var parteFinal = dato.slice(dato.lastIndexOf(".") + 1, dato.length);

  if (parteFinal === final) {

    valido = true;

  }
  
  return valido;
}


/* ---   FUNCIÓN PARA PREVISUALIZAR EL CONTENIDO Y CAMBIAR EL COLOR --- */


function mostrarYCambiarColor(valor, idElemento, idColor) {

  //pasa lo que se escribe a mayúsuclas
  valor = valor.toUpperCase();

  //previsualizar al momento en el div seleccionado
  document.getElementById(idElemento).innerHTML = valor;

  //selecciona el input de color correspondiente
  var color = document.getElementById(idColor);

  //selecciona el div de destino de ese color
  var divDestino = document.getElementById(idElemento);

  //cuando se cambiar el color, lo aplica en el div corresponiente
  color.addEventListener("change", function () {
    divDestino.style.backgroundColor = this.value;
  });
}


/* ---  FUNCIONES PARA SUBIR IMÁGENES --*/

// Función para cambiar el logo de empresa dependiendo de la selección

function mostrarLogoEmpresa(imageSelect) {

  //Cada opción del select Empresa del html tiene un valor asociado, en este caso un número. Se coge ese valor y se guarda en la variable indiceImagen
  var indiceImagen = imageSelect.options[imageSelect.selectedIndex].value;

  //Si la colección de imágenes no está vacía, selecciona la imagen en base a su índice
  if (document.images !== null) {

    document.images[0].src = eval("imagen" + indiceImagen);

  } 
}

// Función para subir la foto

function subirArchivo(event) {

  //crea una variable donde guardar la imagen
  var imagen = document.getElementById("logoEmpresa");

  //crea un objeto de la clase URL con la ruta de la imagen y la guarda en la variable 
  imagen.src = URL.createObjectURL(event.target.files[0]);
}

/* --- FUNCIÓN PARA GUARDAR COMO PDF CON JQUERY--*/

jQuery(document).ready(function () {
  // Se usa la librería jsPDF y HTML2CANVAS.
  //Documentación jsPDF: https://artskydj.github.io/jsPDF/docs/jsPDF.html
  // Documentación HTML2CANVAS: https://html2canvas.hertzen.com/documentation

  $("#guardarComoPDF").click(function () {

   //se selecciona el div que se va a imprimir
    
   html2canvas(document.querySelector("#areaTrabajoPrevisualizacion")).then(
     (canvas) => {
       
       //esto crea una imagen png que se puede ver copiándose el resultado desde la consola con "console.log(base64image);"   y pegándola en el navegador
       let base64image = canvas.toDataURL("image/png");

       //crea un objeto de la librería jsPDF
       //p = portrait
       //px = pixeles
       //primer numero = altura
       //segundo numero = anchura
       let pdf = new jsPDF("p", "px", [1600, 1131]);

       //primer numero = margen izquierdo del pdf
       //segundo numero= margen derecho del pdf
       //tercer numero = altura del div
       //cuarto numero = anchura del div
       pdf.addImage(base64image, "PNG", 200, 200, 722, 516);

       //guardamos el pdf
       pdf.save("mitarjeta.pdf");
     }
   );
 });
});

/* --- FUNCIÓN PARA IMPRIMIR --*/

function imprimir() {

    //Cojo el contenido del div deseado 
    var elementoDiv = document.getElementById("areaTrabajoPrevisualizacion").innerHTML;

    //Cojo el body de todo el html y lo guardo en una variable
    var paginaOriginal = document.body.innerHTML;

    //En el body dejo sólo el div que me interesa
    document.body.innerHTML =
      "<html><head><title></title></head><body>" + elementoDiv + "</body>";

    //Imprimo la página
    window.print();

    //Restauro la página original
    document.body.innerHTML = paginaOriginal;
}

/* --- FUNCIONES PARA VALIDAR --*/

//En todas las funciones para validar, se crea el array "errores", en los que se guardan los mensajes de errores, y después de hace un alert para mostrarlos. Así, el día de mañana, se podría comprobar ese array para saber en lo que más fallan los usuarios.
//Explico la función validarNombre() como ejemplo ya que las funciones de validarCargo(), validarEmail(), validarTelefono() siguen la misma estructura, simplemente cambiando las condiciones para cada una de ellas.
//Explico validarEmpresa() porque es distinta

//Función para validar el nombre

function validarNombre() {

  //recojo el valor del input nombre
  var nombre = document.getElementById("nombre").value;

  //creo un array donde meter los errores
  var errores = [];

  //creo un boleano
  var valido = false;

  if (nombre.length === 0) {

    errores.push("El campo no puede estar vacío");

  } else if (sonNumeros(nombre) > 0) {

    errores.push("No puede haber números en el nombre");

  } else {

    valido = true;

  }

  //si el boleano es falso, muestra los errores con un alert
  if (valido == false) {

    alert(
      "Nombre: " +
        "\n" +
        "    - " +
        errores.join("\n" + "Nombre: " + "\n" + "    - ")
    );
  }
  //devuelve el boleano para poder trabajar con la función en la función validarTodo()
  return valido;
}

///Función para validar el cargo

function validarCargo() {

  var cargo = document.getElementById("cargo").value;

  var errores = [];

  var valido = false;

  if (cargo.length === 0) {

    errores.push("El campo no puede estar vacío");

  } else if (sonNumeros(cargo)) {

    errores.push("No puede haber números en el cargo");

  } else {

    valido = true;
  }

  if (valido == false) {

    alert(
      "Cargo: " +
        "\n" +
        "    - " +
        errores.join("\n" + "Cargo: " + "\n" + "    - ")
    );
  }

  return valido;
}

//Función para validar el teléfono

function validarTelefono() {

  var telefono = document.getElementById("telefono").value;

  var errores = [];

  var valido = false;

  telefono = telefono.trim();

  var primerGrupo = telefono.slice(0, 3);
  var segundoGrupo = telefono.slice(4, 7);
  var tercerGrupo = telefono.slice(8, 11);

  var todosLosGrupos = primerGrupo + segundoGrupo + tercerGrupo;

  if (telefono.length === 0) {

    errores.push("El campo no puede estar vacío");

  } else if (telefono.charAt(0) != 6 && telefono.charAt(0) != 7) {

    errores.push("El primer número debe ser un 6");

  }else if (telefono.length > 11) {

    errores.push("No puede haber más de 11 caracteres");

  } else if (telefono.charCodeAt(3) && telefono.charCodeAt(7) !== 32) {

    errores.push("Las caraceteres 4 y 8 deben ser espacios");

  } else if (sonNumeros(todosLosGrupos) !== 9) {

    errores.push("Solo puedes meter números y espacios, nada más");

  } else {

    valido = true;
  }

  if (valido == false) {

    alert(
      "Telefono: " +
        "\n" +
        "    - " +
        errores.join("\n" + "Telefono: " + "\n" + "    - ")
    );
  }

  return valido;
}

//Función para validar el email

function validarEmail() {

  var email = document.getElementById("email").value;

  email= email.trim();

  var errores = [];

  var valido = false;

  if (email.length === 0) {

    errores.push("El campo no puede estar vacío");

  } else if(contarCaracteres(email, " ") > 0){

  errores.push("No puede haber espacios en blanco dentro del email");

  } else if (contarCaracteres(email, "@") === 0  || contarCaracteres(email, "@") > 1) {

    errores.push("Tiene que haber arroba, y sólo puede haber una");

  } else if (email.indexOf("@") < 3) {

    errores.push("Tiene que haber 3 caracteres antes de la arroba");

  } else if (
    !tipoCuentaEmail(email, "hotmail.") &&
    !tipoCuentaEmail(email, "gmail.") &&
    !tipoCuentaEmail(email, "yahoo.") &&
    !tipoCuentaEmail(email, "icloud.")
  ) {

    errores.push("Despues de la arroba tiene que haber un gmail. , hotmail. , yahoo. o icloud.");

  } else if(!(terminacionEmail(email,'es')) && !(terminacionEmail(email,'com')) ){

    errores.push( 'Debe terminar en "es" o en "com" '  );

  } else {

    valido = true;
  }

  if (valido == false) {
    alert(
      "Email: " +
        "\n" +
        "    - " +
        errores.join("\n" + "Email: " + "\n" + "    - ")
    );
  }

  return valido;
}

/* --- FUNCIÓN PARA VALIDAR TODOS LOS DATOS EN CONJUNTO --*/

// Si todo funciona, retorna true, sino, mira uno a uno los métodos

function validarTodo() {
  // en este caso el boleano "valido" no hace nada, pero lo dejo por si en el futuro hay que meter un boton de "submit" a un archivo recogedor ".php", para asegurarme de que los datos están validados antes de enviarlos

  var valido = false;

  //si todas las funciones de validar salen bien, se activan los botones de Guardar como PDF e Imprimir. Sino, salen los mensajes de error individuales de cada una de las funciones
  if (validarNombre() && validarCargo() && validarEmail() && validarTelefono() == true) {

    valido = true;

    activarBotones();

  }
}


/* --- FUNCIÓN PARA ESCONDER BOTONES HASTA QUE NO SE VALIDE TODO --*/

function activarBotones() {

  const botonImprimir = document.getElementById("imprimir");
  const botonGuardarComoPDF = document.getElementById("guardarComoPDF");
  const botonValidar = document.getElementById("validar");

  //sacan el atributo seleccionado, en este caso el atributo "disabled", por lo que el boton pasa a ser visible
  botonImprimir.removeAttribute("disabled");
  botonGuardarComoPDF.removeAttribute("disabled");

  //cambia el atributo seleccionado, en este caso "class", para que sea verde en vez de azul
  botonValidar.setAttribute("class", "btn btn-success");
}

