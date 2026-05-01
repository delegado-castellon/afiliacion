console.log("JS enlazado - firma electrónica");

// ==================== TIPO PERSONAL ====================
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

function aplicarMaxLength(valor) {
  const inputs = document.querySelectorAll('input[type="text"]');

  inputs.forEach(input => {
    if (!input.hasAttribute("maxlength")) {
      input.setAttribute("maxlength", valor);
    }
  });
}

aplicarMaxLength(50);

// ==================== CENTRO PENITENCIARIO ====================
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
  "SEGOVIA", "SERVICIOS CENTRALES", "SEVILLA", "SEVILLA II (MORÓN DE LA FRONTERA)",
  "SORIA", "TEIXEIRO (CURTIS)", "TENERIFE", "TERUEL", "TOPAS",
  "VALENCIA", "VALLADOLID", "ZARAGOZA"
];

const searchInput = document.getElementById('centro-search');
const listContainer = document.getElementById('centro-list');
const hiddenInput = document.getElementById('centro-value');
const wrapper = document.getElementById('centro-wrapper');

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

searchInput.addEventListener('focus', () => {
  renderCentros(centros);
  listContainer.classList.remove('hidden');
});

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase().trim();
  const filtered = centros.filter(c => c.toLowerCase().includes(term));
  renderCentros(filtered);
  listContainer.classList.remove('hidden');
});

document.addEventListener('click', (e) => {
  if (!wrapper.contains(e.target)) {
    listContainer.classList.add('hidden');
  }
});

renderCentros(centros);

// ==================== CRONÓMETRO ====================
// FIX: se inicializa con Date.now() como fallback para evitar NaN si no hubo focus
let tiempoInicio = Date.now();

const iniciarAlTocar = () => {
  tiempoInicio = Date.now();
  console.log("Cronómetro iniciado...");
  document.removeEventListener('focusin', iniciarAlTocar);
};
document.addEventListener('focusin', iniciarAlTocar);

// ==================== VALIDACIONES ====================


// FIX: función centralizada de validación antes de enviar
function validarFormulario() {
  const errores = [];

  if (!validarDNI(inputDNI.value)) {
    errores.push("El DNI introducido no es válido.");
    inputDNI.classList.add("border-red-500");
  }

  const firma = document.getElementById("firma-data").value;
  if (!firma) {
    errores.push("La firma es obligatoria.");
  }

  const centro = document.getElementById("centro-value").value;
  if (!centro) {
    errores.push("Debes seleccionar un centro penitenciario.");
  }

  return errores;
}

// ==================== ENVÍO A GOOGLE SHEETS ====================
async function enviar() {
  
  const firmaBase64 = document.getElementById("firma-data").value || "";
  const dniBase64 = document.getElementById("dni-base64").value || "";

  const data = {
    nombre:              document.getElementById("nombre")?.value?.toUpperCase() || "",
    apellido1:           document.getElementById("apellido1")?.value?.toUpperCase() || "",
    apellido2:           document.getElementById("apellido2")?.value?.toUpperCase() || "",
    sexo:                document.querySelector('input[name="sexo"]:checked')?.value || "",
    ano_nacimiento:      document.getElementById("ano_nacimiento").value,
    nif:                 document.getElementById("nif").value,
    telefono:            document.getElementById("telefono").value,
    email:               document.getElementById("email").value,
    nivel_formativo:     document.getElementById("nivel_formativo").value,
    direccion:           document.getElementById("direccion").value,
    numero:              document.getElementById("numero").value,
    piso:                document.getElementById("piso").value,
    letra_puerta:        document.getElementById("letra_puerta").value,
    codigo_postal:       document.getElementById("codigo_postal").value,
    localidad:           document.getElementById("localidad").value,
    provincia:           document.getElementById("provincia").value,
    provincia_fiscal:    document.getElementById("provincia_fiscal").value,
    tipo_cuota:          document.querySelector('input[name="tipo_cuota"]:checked')?.value || "",
    centro_penitenciario: document.getElementById("centro-value").value || "",
    ano_ingreso:         document.getElementById("ano_ingreso").value,
    tipo_personal:       document.querySelector('input[name="tipo_personal"]:checked')?.value || "",
    grupo:               document.querySelector('input[name="grupo"]:checked')?.value || "",
    en_practicas:        document.getElementById("en_practicas").checked,
    grado_consolidado:   document.getElementById("grado_consolidado").value,
    puesto_trabajo:      document.getElementById("puesto_trabajo").value,
    fecha_alta:          document.getElementById("fecha_alta").value,
    acepta_privacidad:   document.getElementById("acepta_privacidad").value,
    firma:               firmaBase64,
    dni_base64:          dniBase64,
    tiempo_fin:          document.getElementById("tiempo_fin").value
  };

  // FIX: se elimina el alert() y se deja que el error burbujee al submit

  const formData = new FormData();
  formData.append("payload", JSON.stringify(data));
  formData.append("token", "S3cr3tAcaip2026_XYZ_91");
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbyK6gD2146PmvQYmw_BvK9BO5OJMQB6ONUYFlPcMtjXqxzuxokX0FO2noN7_DVBnFarvQ/exec",
    {
      method: "POST",
      //body: JSON.stringify(data)
      body: formData
    }
  );

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  console.log("GS ok");
}

// ==================== SUBMIT ====================
const form = document.getElementById('afiliacion-form');
const submitBtn = form.querySelector('button[type="submit"]');
const originalBtnText = submitBtn.innerHTML;

// FIX: un único listener, sin anidamiento
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Validar antes de nada
  const errores = validarFormulario();
  if (errores.length > 0) {
    showMessage('error', errores.join('<br>'));
    return;
  }

  // Calcular tiempo
  const tiempoFin = Date.now();
  const diferenciaSegundos = Math.round((tiempoFin - tiempoInicio) / 1000);
  document.getElementById('tiempo_fin').value = diferenciaSegundos;
  console.log("Tiempo final:", diferenciaSegundos);

  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando solicitud...`;
  submitBtn.disabled = true;

  try {
    await enviar();
    showMessage('success', '¡Solicitud enviada con éxito! ✅<br>Te contactaremos pronto.');
    form.reset();
  } catch (error) {
    console.error("Error al enviar:", error);
    showMessage('error', 'Error al enviar la solicitud ❌<br>Por favor, inténtalo de nuevo.\n' + error);
  } finally {
    // FIX: usar finally para restaurar el botón siempre, tanto en éxito como en error
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
});

// ==================== MENSAJES ====================
function showMessage(type, message) {
  let msgDiv = document.getElementById('form-message');
  if (!msgDiv) {
    msgDiv = document.createElement('div');
    msgDiv.id = 'form-message';
    msgDiv.className = 'mt-6 p-5 rounded-2xl text-center text-lg font-bold shadow-sm';
    form.append(msgDiv);
  }

  if (type === 'success') {
    msgDiv.style.backgroundColor = '#ecfdf5';
    msgDiv.style.color = '#10b981';
    msgDiv.style.border = '1px solid #a7f3d0';
    setTimeout(() => { window.location.href = 'gracias.html'; }, 1500);
  } else {
    msgDiv.style.backgroundColor = '#fef2f2';
    msgDiv.style.color = '#ef4444';
    msgDiv.style.border = '1px solid #fecaca';
    setTimeout(() => { if (msgDiv) msgDiv.remove(); }, 8000);
  }

  msgDiv.innerHTML = message;
}

// ==================== FIRMA DIGITAL ====================
let signaturePad;

// FIX: un único DOMContentLoaded que inicializa todo
document.addEventListener('DOMContentLoaded', () => {

  // Fecha de hoy
  const fechaInput = document.getElementById('fecha_alta');
  fechaInput.value = new Date().toISOString().split('T')[0];

  // Canvas de firma
  const canvas = document.getElementById('signature-canvas');
  signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgba(0,0,0,0)',
    penColor: '#1e40af',
    minWidth: 1.2,
    maxWidth: 3.5,
    throttle: 16
  });

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const oldData = signaturePad.toData();
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear();
    signaturePad.fromData(oldData);
  }

  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      resizeCanvas();
    }
  });
  resizeCanvas();

  function saveSignature() {
    if (!signaturePad.isEmpty()) {
      const base64Firma = signaturePad.toDataURL('image/png');
      document.getElementById('firma-data').value = base64Firma;
    } else {
      document.getElementById('firma-data').value = '';
    }
  }

  signaturePad.addEventListener("endStroke", saveSignature);

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
});

// ==================== FOTO DNI ====================
const fotoDniInput = document.getElementById('dniFoto');
const preview = document.getElementById('previewDni');
const previewContainer = document.getElementById('dni-preview-container');
const placeholder = document.getElementById('dni-placeholder');
const base64Input = document.getElementById('dni-base64');

fotoDniInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Selecciona una imagen válida');
    fotoDniInput.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      const MAX_SIZE = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) { height = height * (MAX_SIZE / width); width = MAX_SIZE; }
      } else {
        if (height > MAX_SIZE) { width = width * (MAX_SIZE / height); height = MAX_SIZE; }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      base64Input.value = compressedBase64;
      preview.src = compressedBase64;
      previewContainer.classList.remove('hidden');
      placeholder.classList.add('hidden');
    };
  };
  reader.readAsDataURL(file);
});

//Validación directa dni
/*function validarDNI(dni) {
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const regex = /^[0-9]{8}[A-Z]$/;
  dni = dni.toUpperCase();
  if (!regex.test(dni)) return false;
  const numero = dni.substring(0, 8);
  const letra = dni.charAt(8);
  return letra === letras[numero % 23];
}

const inputDNI = document.getElementById("nif");
const errorDNI = document.getElementById("dni-error");

inputDNI.addEventListener("input", () => {
  inputDNI.value = inputDNI.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
  const dni = inputDNI.value;
  if (dni.length === 9) {
    if (validarDNI(dni)) {
      errorDNI.classList.add("opacity-0");
      inputDNI.classList.remove("border-red-500");
      inputDNI.classList.add("border-green-500");
    } else {
      errorDNI.classList.remove("opacity-0");
      inputDNI.classList.add("border-red-500");
      inputDNI.classList.remove("border-green-500");
    }
  } else {
    errorDNI.classList.add("opacity-0");
    inputDNI.classList.remove("border-red-500", "border-green-500");
  }
});*/

const dniInput = document.getElementById("nif");

function validarDNI(dni) {
  const regex = /^\d{8}[A-Z]$/;
  if (!regex.test(dni)) return "Formato 8 dígitos + letra";

  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  const num = parseInt(dni.substring(0, 8), 10);

  if (dni[8] !== letras[num % 23]) return "DNI incorrecto";

  return "";
}

// 🔥 validación al perder foco (modo nativo real)
dniInput.addEventListener("blur", () => {
  let dni = dniInput.value.toUpperCase().trim();
  dniInput.value = dni;

  dniInput.setCustomValidity("");

  if (!dni) return; // required ya se encarga

  const error = validarDNI(dni);

  if (error) {
    dniInput.classList.remove("border-green-500");
    dniInput.classList.add("border-red-500");
    dniInput.setCustomValidity(error);
    dniInput.reportValidity();
    dniInput.classList.remove("border-green-500");
    dniInput.classList.add("border-red-500");
  }else{
    dniInput.classList.remove("border-red-500");
    dniInput.classList.add("border-green-500");
  }
});

dniInput.addEventListener("input", () => {
  dniInput.setCustomValidity("");
  dniInput.classList.remove("border-red-500");
  dniInput.classList.remove("border-green-500");
});