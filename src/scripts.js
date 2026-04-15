//Confirmando el enlace
console.log("JS enlazado");



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

emailjs.init({ publicKey: "FjItOKQhO8vJGYH-S" });

const form = document.getElementById('afiliacion-form');
const submitBtn = form.querySelector('button[type="submit"]');
let originalBtnText = submitBtn.innerHTML;

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Cambiar botón a "Enviando..."
    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i> Enviando solicitud...
    `;
    submitBtn.disabled = true;

    // Enviar con EmailJS
    emailjs.sendForm('service_04v84lc', 'template_qecdm6i', this)
        .then(() => {
            // Mensaje de éxito bonito
            showMessage('success', '¡Solicitud enviada con éxito! ✅<br>Te contactaremos pronto.');
            //form.reset();
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
        });
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
       
        
// ==================== FIRMA DIGITAL CORREGIDA ====================
/*
let signaturePad;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signature-canvas');
    
    signaturePad = new SignaturePad(canvas, {
        backgroundColor: '#ffffff',
        penColor: '#1e40af',
        minWidth: 1.2,
        maxWidth: 3.5,
        throttle: 16
    });

    // Ajuste importante para evitar desplazamiento
    function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        signaturePad.clear(); // Limpiar después de redimensionar
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Inicial

    // Guardar firma
    function saveSignature() {
        if (!signaturePad.isEmpty()) {
            document.getElementById('firma-data').value = signaturePad.toDataURL('image/png');
        }
    }

    canvas.addEventListener('mouseup', saveSignature);
    canvas.addEventListener('touchend', saveSignature);

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
            saveSignature();
        }
    });
});*/
       
/* SOPORTE PARA FOTO DNI . EN BARBECHO
            
            const dropZone = document.getElementById('drop-zone');
            const fileInput = document.getElementById('foto-dni');
            const uploadContent = document.getElementById('upload-content');
            const previewArea = document.getElementById('preview-area');
            const previewContainer = document.getElementById('preview-container');
            const base64Input = document.getElementById('foto-dni-base64');
            const nombreInput = document.getElementById('foto-dni-nombre');

            function handleFile(file) {
                if (!file) return;

                if (file.size > 5 * 1024 * 1024) {
                    alert("El archivo es demasiado grande. Máximo 5 MB.");
                    return;
                }

                nombreInput.value = file.name;

                const reader = new FileReader();
                reader.onload = function(e) {
                    base64Input.value = e.target.result;

                    // Mostrar vista previa según tipo de archivo
                    previewContainer.innerHTML = '';

                    if (file.type === "application/pdf") {
                        previewContainer.innerHTML = `
                            <div class="bg-gray-100 border border-gray-300 rounded-2xl p-8 text-center">
                                <div class="text-6xl mb-4">📕</div>
                                <p class="font-medium">${file.name}</p>
                                <p class="text-xs text-gray-500 mt-2">Documento PDF</p>
                            </div>`;
                    } else {
                        // Imagen
                        previewContainer.innerHTML = `<img src="${e.target.result}" class="max-h-80 mx-auto rounded-2xl shadow-lg border border-gray-200" alt="Vista previa DNI">`;
                    }

                    uploadContent.classList.add('hidden');
                    previewArea.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }

            // Eventos
            dropZone.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) handleFile(e.target.files[0]);
            });

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('border-blue-500', 'bg-blue-50');
            });
            dropZone.addEventListener('dragleave', () => dropZone.classList.remove('border-blue-500', 'bg-blue-50'));
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('border-blue-500', 'bg-blue-50');
                if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
            });

            document.getElementById('change-photo').addEventListener('click', () => fileInput.click());
            document.getElementById('remove-photo').addEventListener('click', () => {
                fileInput.value = '';
                base64Input.value = '';
                nombreInput.value = '';
                uploadContent.classList.remove('hidden');
                previewArea.classList.add('hidden');
            });
       */
//script para enviar los datos a google sheets
async function enviar() {

  const data = {
      nombre: document.getElementById("nombre").value,
      apellido1: document.getElementById("apellido1").value,
      apellido2: document.getElementById("apellido2").value,
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
      provincia: document.getElementById("provincia").value,
      tipo_cuota: document.querySelector('input[name="tipo_cuota"]:checked')?.value || "",
      centro_penitenciario: document.getElementById("centro-value").value || "",
      ano_ingreso: document.getElementById("ano_ingreso").value,
      tipo_personal: document.querySelector('input[name="tipo_personal"]:checked')?.value || "",
      grupo: document.querySelector('input[name="grupo"]:checked')?.value || "",
      en_practicas: document.getElementById("en_practicas").value,
      grado_consolidado: document.getElementById("grado_consolidado").value,
      puesto_trabajo: document.getElementById("puesto_trabajo").value,
      fecha_alta: document.getElementById("fecha_alta").value,
      acepta_privacidad: document.getElementById("acepta_privacidad").value,
  };

  try {
      await fetch("https://script.google.com/macros/s/AKfycbzE207MmihCqjAAlQ1hSDZnKC0ISeIpZ_c7VQ4_mzcXLunmtMWZxTpC9E46rLN5zU4NNg/exec", {
      method: "POST",
      body: JSON.stringify(data)
      });
      //dejar solo en desarrollo**************************************
      alert("PRUEBA 1: Guardado en Google Sheets");

  } catch (error) {
      console.error(error);
      alert("Error");
  }
}
