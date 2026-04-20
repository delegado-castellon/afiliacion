//Confirmando el enlace
console.log("JS enlazado - firma electrónica");



// Lógica para mostrar el apartado correspondiente
  const radios = document.querySelectorAll('input[name="tipo_personal"]');
  const funcDiv = document.getElementById('grupo-funcionario');
  const labDiv = document.getElementById('grupo-laboral');
  
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'Funcionario') {
            funcDiv.classList.remove('hidden');
            labDiv.classList.add('hidden');
        } else if (radio.value === 'Personal Laboral') {
            labDiv.classList.remove('hidden');
            funcDiv.classList.add('hidden');
        }
    });
  });
        
// Poner la fecha de hoy automáticamente en el campo "Fecha de alta"
document.addEventListener('DOMContentLoaded', function() {
  const fechaInput = document.getElementById('fecha_alta');
  const hoy = new Date().toISOString().split('T')[0];   // Formato YYYY-MM-DD
  fechaInput.value = hoy;
});
       
// ==================== CENTRO PENITENCIARIO CON BÚSQUEDA ====================
const centros = [
    "A LAMA", "ALBACETE", "ALBOLOTE", "ALCAZAR DE SAN JUAN", "ALGECIRAS",
    "ALICANTE CUMPLIMIENTO", "ALICANTE II", "ALMERÍA CUMPLIMIENTO", "ARRECIFE",
    "ASTURIAS", "ÁVILA", "BADAJOZ", "BURGOS", "CÁCERES", "CASTELLÓN",
    "CASTELLÓN II (ALBOCASSER)", "CEUTA",
    "CIS CARMELA ARIAS Y DÍAZ DE RÁBAGO (A CORUÑA)",
    "CIS DAVID BELTRÁN CATALÁ (HUELVA)", "CIS EVARISTO MARTÍN NIETO (MÁLAGA)",
    "CIS GUILLERMO MIRANDA (MURCIA)", "CIS JOAQUÍN RUIZ-GIMÉNEZ (MALLORCA)",
    "CIS JOSEFINA ALDECOA (NAVALCARNERO)", "CIS LUIS JIMÉNEZ DE ASÚA (SEVILLA)",
    "CIS MANUEL MONTESINOS (ALGECIRAS)", "CIS MATILDE CANTOS FERNÁNDEZ (GRANADA)",
    "CIS MELCHOR RODRÍGUEZ GARCÍA (ALC. HENARES)", "CIS MERCEDES PINTO (TENERIFE)",
    "CIS TORRE ESPIOCA (VALENCIA)", "CIS VICTORIA KENT (MADRID)",
    "CÓRDOBA", "CUENCA", "DAROCA", "EL DUESO (SANTOÑA)", "HERRERA DE LA MANCHA",
    "HUELVA", "IBIZA", "JAÉN", "LA MORALEJA (DUEÑAS)", "LAS PALMAS", "LAS PALMAS II",
    "LEÓN", "LOGROÑO", "LUGO-BONXE", "LUGO-MONTERROSO",
    "MADRID I - MUJERES (ALCALÁ DE HENARES)", "MADRID II (ALCALÁ DE HENARES)",
    "MADRID III (VALDEMORO)", "MADRID IV (NAVALCARNERO)", "MADRID V (SOTO DEL REAL)",
    "MADRID VI (ARANJUEZ)", "MADRID VII (ESTREMERA)", "MÁLAGA", "MÁLAGA II",
    "MALLORCA", "MELILLA", "MENORCA", "MURCIA", "MURCIA II", "OCAÑA I", "OCAÑA II",
    "OURENSE", "PAMPLONA I", "PSIQUIÁTRICO PENITENCIARIO DE ALICANTE",
    "PSIQUIÁTRICO PENITENCIARIO DE SEVILLA", "PUERTO STª MARÍA I",
    "PUERTO STª MARÍA II", "PUERTO STª MARÍA III", "SANTA CRUZ DE LA PALMA",
    "SEGOVIA", "SERVICIOS CENTRALES", "SEVILLA", "SEVILLA II (MORÓN DE LA FRONTERA)", "SORIA",
    "TEIXEIRO (CURTIS)", "TENERIFE", "TERUEL", "TOPAS", "VALENCIA", "VALLADOLID", "ZARAGOZA"
];

const searchInput = document.getElementById('centro-search');
const listContainer = document.getElementById('centro-list');
const hiddenInput = document.getElementById('centro-value');
const wrapper = document.getElementById('centro-wrapper');

// Renderizar la lista completa
function renderCentros(filteredCentros) {
    listContainer.innerHTML = `<div class="px-4 py-2 text-xs text-gray-500 border-b">Selecciona tu centro</div>`;
    
    filteredCentros.forEach(centro => {
        const div = document.createElement('div');
        div.className = "px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700";
        div.textContent = centro;
        div.addEventListener('click', () => {
            searchInput.value = centro;
            hiddenInput.value = centro;
            listContainer.classList.add('hidden');
        });
        listContainer.appendChild(div);
    });
}

// Mostrar lista al hacer clic en el input
searchInput.addEventListener('focus', () => {
    renderCentros(centros);
    listContainer.classList.remove('hidden');
});

// Filtrar mientras se escribe
searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase().trim();
    const filtered = centros.filter(c => c.toLowerCase().includes(term));
    renderCentros(filtered);
    listContainer.classList.remove('hidden');
});

// Cerrar lista al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
        listContainer.classList.add('hidden');
    }
});

// Inicializar
renderCentros(centros);

// Envío de correos a través de emailjs

//emailjs.init({ publicKey: "FjItOKQhO8vJGYH-S" });

const form = document.getElementById('afiliacion-form');
const submitBtn = form.querySelector('button[type="submit"]');
let originalBtnText = submitBtn.innerHTML;
/*
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Cambiar botón a "Enviando..."
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando solicitud...`;
    submitBtn.disabled = true;

    setTimeout(() => {
        showMessage('success', '¡Solicitud enviada con éxito! ✅<br>Te contactaremos pronto.');
    }, 1000);

    enviar();
    
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    form.reset();*/
    
    form.addEventListener('submit', async function(e) {
    e.preventDefault();

    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando solicitud...`;
    submitBtn.disabled = true;

    try {
        await enviar(); // 👈 ESPERA REAL

        showMessage('success', '¡Solicitud enviada con éxito! ✅<br>Te contactaremos pronto.');

        form.reset();

    } catch (error) {
        showMessage('error', 'Error al enviar la solicitud ❌');
    }

    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;




    // Enviar con EmailJS
    /*emailjs.sendForm('service_04v84lc', 'template_qecdm6i', this)
        .then(() => {
            // Mensaje de éxito bonito
            showMessage('success', '¡Solicitud enviada con éxito! ✅<br>Te contactaremos pronto.');
            enviar();
            form.reset();
        })
        .catch((error) => {
            // Mensaje de error
            showMessage('error', 'Hubo un problema al enviar la solicitud.<br>Por favor, inténtalo de nuevo.');
            console.error(error);
        })
        .finally(() => {
            // Restaurar botón
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });*/
});

// Función para mostrar mensaje bonito
function showMessage(type, message) {
    let msgDiv = document.getElementById('form-message');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'form-message';
        msgDiv.className = 'mt-6 p-5 rounded-2xl text-center text-lg';
        //form.prepend(msgDiv);   // Lo pone arriba del formulario
        form.append(msgDiv);
    }

    if (type === 'success') {
        msgDiv.style.backgroundColor = '#ecfdf5';
        msgDiv.style.color = '#10b981';
        msgDiv.style.border = '1px solid #a7f3d0';
    } else {
        msgDiv.style.backgroundColor = '#fef2f2';
        msgDiv.style.color = '#ef4444';
        msgDiv.style.border = '1px solid #fecaca';
    }

    msgDiv.innerHTML = message;

    // Desaparece automáticamente después de 8 segundos
    setTimeout(() => {
        if (msgDiv) msgDiv.remove();
    }, 8000);
}

// Validación DNI
function validarDNI(dni) {
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    const regex = /^[0-9]{8}[A-Z]$/;

    dni = dni.toUpperCase();

    if (!regex.test(dni)) return false;

    const numero = dni.substring(0, 8);
    const letra = dni.charAt(8);

    const letraCorrecta = letras[numero % 23];

    return letra === letraCorrecta;
}

const inputDNI = document.getElementById("nif");
const errorDNI = document.getElementById("dni-error");

inputDNI.addEventListener("input", () => {
    const dni = inputDNI.value;

    if (dni.length === 9) {
        if (validarDNI(dni)) {
            errorDNI.classList.add("opacity-0");    // ocultar
            inputDNI.classList.remove("border-red-500");
            inputDNI.classList.add("border-green-500");
        } else {
            errorDNI.classList.remove("opacity-0"); // mostrar
            inputDNI.classList.add("border-red-500");
            inputDNI.classList.remove("border-green-500");
        }
    } else {
        errorDNI.classList.add("opacity-0");    // ocultar
        inputDNI.classList.remove("border-red-500", "border-green-500");
    }
});
       
//script para enviar los datos a google sheets
async function enviar() {

  const firmaBase64 = document.getElementById("firma-data").value || ""; //para la firma
  const dniBase64 = document.getElementById("dni-base64").value || ""; //para la firma
  console.log(firmaBase64);
  const data = {
      nombre: document.getElementById("nombre")?.value?.toUpperCase() || "",
      apellido1: document.getElementById("apellido1")?.value?.toUpperCase() || "",
      apellido2: document.getElementById("apellido2")?.value?.toUpperCase() || "",
      sexo: document.querySelector('input[name="sexo"]:checked')?.value || "",
      ano_nacimiento: document.getElementById("ano_nacimiento").value,
      nif: document.getElementById("nif").value,
      telefono: document.getElementById("telefono").value,
      email: document.getElementById("email").value,
      nivel_formativo: document.getElementById("nivel_formativo").value,
      direccion: document.getElementById("direccion").value,
      numero: document.getElementById("numero").value,
      piso: document.getElementById("piso").value,
      letra_puerta: document.getElementById("letra_puerta").value,
      codigo_postal: document.getElementById("codigo_postal").value,
      localidad: document.getElementById("localidad").value,
      provincia: document.getElementById("provincia").value,
      provincia_fiscal: document.getElementById("provincia_fiscal").value,
      tipo_cuota: document.querySelector('input[name="tipo_cuota"]:checked')?.value || "",
      centro_penitenciario: document.getElementById("centro-value").value || "",
      ano_ingreso: document.getElementById("ano_ingreso").value,
      tipo_personal: document.querySelector('input[name="tipo_personal"]:checked')?.value || "",
      grupo: document.querySelector('input[name="grupo"]:checked')?.value || "",
      en_practicas: document.getElementById("en_practicas").checked,
      grado_consolidado: document.getElementById("grado_consolidado").value,
      puesto_trabajo: document.getElementById("puesto_trabajo").value,
      fecha_alta: document.getElementById("fecha_alta").value,
      acepta_privacidad: document.getElementById("acepta_privacidad").value,
      firma: firmaBase64,
      dni_base64: dniBase64
  };

  try {
      await fetch("https://script.google.com/macros/s/AKfycbwEyKN_BYoFTZRI6PMfhyfIYfnmiiSevlb9HzQ-RVDpXW81oZwynhuUXkaTkHUwaQgI/exec", {
      method: "POST",
      body: JSON.stringify(data)
      });
      console.log("GS ok");

  } catch (error) {
      console.error(error);
      alert("Error");
  }
}
// ==================== FIRMA DIGITAL CORREGIDA ====================
            
let signaturePad;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signature-canvas');
    
    signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(0,0,0,0)', // Transparente
        penColor: '#1e40af',
        minWidth: 1.2,
        maxWidth: 3.5,
        throttle: 16
    });

    // Función para redimensionar el canvas correctamente
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        
        // 1. Guardamos lo que el usuario ya dibujó
        const oldData = signaturePad.toData(); 

        // 2. Redimensionamos
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);

        // 3. Limpiamos y volvemos a cargar los datos para que se ajusten al nuevo tamaño
        signaturePad.clear(); 
        signaturePad.fromData(oldData); 
    }

    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        // Solo redimensiona si cambia el ancho (ignora cambios de altura por teclado/barras en móvil)
        if (window.innerWidth !== lastWidth) {
            lastWidth = window.innerWidth;
            resizeCanvas();
        }
    });
    resizeCanvas();

    // ====================== GUARDAR FIRMA ======================
    function saveSignature() {
        if (!signaturePad.isEmpty()) {
            const base64Firma = signaturePad.toDataURL('image/png');
            document.getElementById('firma-data').value = base64Firma;
            
            console.log("✅ Firma guardada correctamente");
            console.log("Longitud base64:", base64Firma.length);
            // console.log(base64Firma);   // descomenta solo si quieres ver todo el base64
        } else {
            document.getElementById('firma-data').value = '';
            console.log("Firma vacía");
        }
    }

    // ←←← ESTO ES LO MÁS IMPORTANTE ←←←
    signaturePad.addEventListener("endStroke", saveSignature);

    // Botones
    document.getElementById('clear-signature').addEventListener('click', () => {
        signaturePad.clear();
        document.getElementById('firma-data').value = '';
    });

    document.getElementById('undo-signature').addEventListener('click', () => {
        const data = signaturePad.toData();
        if (data.length > 0) {
            data.pop();
            signaturePad.fromData(data);
            saveSignature();        // actualizamos el input después de undo
        }
    });
});
// ====================== GUARDAR DNI ======================
const dniInput = document.getElementById('dniFoto');
const preview = document.getElementById('previewDni');
const previewContainer = document.getElementById('dni-preview-container');
const placeholder = document.getElementById('dni-placeholder');
const base64Input = document.getElementById('dni-base64');

dniInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Selecciona una imagen válida');
        dniInput.value = '';
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {

            const MAX_SIZE = 800;
            let width = img.width;
            let height = img.height;

            // Mantener proporción
            if (width > height) {
                if (width > MAX_SIZE) {
                    height = height * (MAX_SIZE / width);
                    width = MAX_SIZE;
                }
            } else {
                if (height > MAX_SIZE) {
                    width = width * (MAX_SIZE / height);
                    height = MAX_SIZE;
                }
            }

            // Canvas para redimensionar
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convertir a base64 comprimido
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

            // Guardar
            base64Input.value = compressedBase64;

            // Mostrar preview
            preview.src = compressedBase64;
            previewContainer.classList.remove('hidden');
            placeholder.classList.add('hidden');
        };
    };

    reader.readAsDataURL(file);
});