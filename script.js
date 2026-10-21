/* ==========================================================================
   ReModa · Funciones interactivas
   Índice:
   1. Configuración de la tienda (EDITAR AQUÍ)
   2. Datos del catálogo
   3. Utilidades
   4. Imágenes alternativas (si una foto no carga)
   5. Catálogo: tarjetas, buscador y filtros
   6. Ficha digital (ventana modal)
   7. "Me interesa", WhatsApp y formulario de contacto
   8. Navegación, animaciones y pie de página
   9. Inicio de la página
   ========================================================================== */
'use strict';

/* 1. CONFIGURACIÓN DE LA TIENDA ------------------------------------------
   Cuando tengas los datos reales, escríbelos aquí. Mientras estén vacíos,
   la página lo indica con honestidad y no simula envíos.                   */
const CONFIG = {
  // Número de WhatsApp con código de país, sin "+" ni espacios. Ej.: '50688887777'
  whatsapp: '',
  // Correo de la tienda. Ej.: 'hola@remoda.cr'
  correo: '',
  // Enlace de Instagram u otra red. Ej.: 'https://instagram.com/remoda.cr'
  instagram: '',
  ubicacion: 'Costa Rica',
  // Texto sobre devoluciones (no promete garantías que no existen)
  devolucion: 'Las condiciones de cambio o devolución se coordinan directamente con la tienda antes de concretar la compra.',
  devolucionCorta: 'Se coordina con la tienda antes de comprar'
};

/* Significado de cada estado de conservación */
const ESTADOS = {
  'Excelente': 'Sin señales visibles de uso. Se ve y se siente como nueva.',
  'Muy bueno': 'Uso leve y bien cuidada. Puede tener un desgaste mínimo propio del uso, sin daños.',
  'Bueno': 'Presenta señales de uso visibles (por ejemplo, ligero desgaste del color), sin roturas que afecten su uso.'
};

/* Genera un enlace de Unsplash con el tamaño indicado */
const foto = (id, ancho = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${ancho}&q=80`;

/* 2. DATOS DEL CATÁLOGO ----------------------------------------------------
   Productos de ejemplo para el prototipo.
   - precioAnterior: déjalo en null. Si alguna prenda tiene una rebaja real,
     escribe el precio anterior y la página mostrará el descuento sola.
   - medidas: valores de referencia para el prototipo.                       */
const PRODUCTOS = [
  {
    codigo: 'RM-001',
    nombre: 'Camiseta Vintage Retro',
    categoria: 'Camisetas',
    talla: 'M',
    estado: 'Muy bueno',
    precio: 3500,
    precioAnterior: null,
    material: 'Algodón',
    descripcion: 'Camiseta vintage cómoda, ideal para outfits casuales.',
    medidas: { 'Pecho (axila a axila)': '52 cm', 'Largo total': '71 cm', 'Hombros': '46 cm' },
    cuidados: ['Lavar con agua fría y colores similares', 'Secar a la sombra para conservar el color', 'Planchar al revés a temperatura media'],
    imagenes: [foto('photo-1576566588028-4147f3842f27'), foto('photo-1521572163474-6864f9cf17ab')],
    alt: 'Camiseta vintage de estilo retro'
  },
  {
    codigo: 'RM-002',
    nombre: 'Camiseta Básica Oversize',
    categoria: 'Camisetas',
    talla: 'L',
    estado: 'Excelente',
    precio: 4000,
    precioAnterior: null,
    material: 'Algodón y poliéster',
    descripcion: 'Prenda versátil para combinar con distintos estilos.',
    medidas: { 'Pecho (axila a axila)': '58 cm', 'Largo total': '74 cm', 'Hombros': '54 cm' },
    cuidados: ['Lavar con agua fría en ciclo delicado', 'Evitar la secadora a alta temperatura', 'No usar cloro'],
    imagenes: [foto('photo-1521572163474-6864f9cf17ab'), foto('photo-1503342217505-b0a15ec3261c')],
    alt: 'Camiseta básica de corte oversize'
  },
  {
    codigo: 'RM-003',
    nombre: 'Pantalón Denim Clásico',
    categoria: 'Pantalones',
    talla: '30',
    estado: 'Muy bueno',
    precio: 6500,
    precioAnterior: null,
    material: 'Mezclilla',
    descripcion: 'Pantalón de mezclilla resistente, ideal para el uso diario.',
    medidas: { 'Cintura (de lado a lado)': '39 cm', 'Tiro': '26 cm', 'Largo total': '102 cm' },
    cuidados: ['Lavar al revés con agua fría', 'Evitar el cloro para conservar el tono', 'Secar al aire libre'],
    imagenes: [foto('photo-1542272604-787c3835535d'), foto('photo-1604176354204-9268737828e4')],
    alt: 'Pantalón de mezclilla azul clásico'
  },
  {
    codigo: 'RM-004',
    nombre: 'Pantalón Cargo Urbano',
    categoria: 'Pantalones',
    talla: 'M',
    estado: 'Bueno',
    precio: 5500,
    precioAnterior: null,
    material: 'Algodón',
    descripcion: 'Pantalón de estilo urbano con bolsillos funcionales.',
    medidas: { 'Cintura (de lado a lado)': '40 cm', 'Tiro': '28 cm', 'Largo total': '100 cm' },
    cuidados: ['Vaciar los bolsillos antes de lavar', 'Lavar con agua fría y colores similares', 'Secar a la sombra'],
    imagenes: [foto('photo-1624378439575-d8705ad7ae80'), foto('photo-1473966968600-fa801b869a1a')],
    alt: 'Pantalón cargo de estilo urbano con bolsillos laterales'
  },
  {
    codigo: 'RM-005',
    nombre: 'Chaqueta Denim Vintage',
    categoria: 'Chaquetas',
    talla: 'M',
    estado: 'Muy bueno',
    precio: 8500,
    precioAnterior: null,
    material: 'Mezclilla',
    descripcion: 'Chaqueta clásica que complementa diferentes outfits.',
    medidas: { 'Pecho (axila a axila)': '54 cm', 'Largo total': '62 cm', 'Manga': '60 cm' },
    cuidados: ['Lavar al revés con agua fría', 'Abotonar antes de lavar', 'Secar colgada al aire libre'],
    imagenes: [foto('photo-1551537482-f2075a1d41f2'), foto('photo-1576995853123-5a10305d93c0')],
    alt: 'Chaqueta de mezclilla de estilo vintage'
  },
  {
    codigo: 'RM-006',
    nombre: 'Chaqueta Casual',
    categoria: 'Chaquetas',
    talla: 'L',
    estado: 'Excelente',
    precio: 9000,
    precioAnterior: null,
    material: 'Mezcla de algodón y poliéster',
    descripcion: 'Chaqueta versátil para utilizar en diferentes ocasiones.',
    medidas: { 'Pecho (axila a axila)': '58 cm', 'Largo total': '70 cm', 'Manga': '63 cm' },
    cuidados: ['Lavar con agua fría en ciclo delicado', 'Cerrar cremalleras antes de lavar', 'Planchar a temperatura baja'],
    imagenes: [foto('photo-1591047139829-d91aecb6caea'), foto('photo-1544022613-e87ca75a784a')],
    alt: 'Chaqueta casual de corte moderno'
  }
];

/* 3. UTILIDADES ------------------------------------------------------------ */
const $ = (selector, contexto = document) => contexto.querySelector(selector);
const $$ = (selector, contexto = document) => [...contexto.querySelectorAll(selector)];

/* 6500 -> "₡6.500" */
const formatearPrecio = (monto) => '₡' + monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/* Quita mayúsculas y tildes para comparar textos */
const normalizar = (texto) => texto.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

/* "Muy bueno" -> "muy-bueno" (para clases CSS) */
const slug = (texto) => normalizar(texto).replace(/\s+/g, '-');

/* Porcentaje de descuento (0 si no hay precio anterior) */
const calcularDescuento = (p) =>
  p.precioAnterior && p.precioAnterior > p.precio ? Math.round((1 - p.precio / p.precioAnterior) * 100) : 0;

const buscarProducto = (codigo) => PRODUCTOS.find((p) => p.codigo === codigo);

/* Notificación breve en la parte inferior */
let temporizadorToast;
function mostrarToast(mensaje) {
  const toast = $('#toast');
  toast.textContent = mensaje;
  toast.classList.add('is-visible');
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

/* Íconos reutilizables */
const ICONOS = {
  percha: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a2 2 0 1 1 2-2c0 1-.8 1.5-2 2.3V9"/><path d="M12 9 2.8 15.4A1.5 1.5 0 0 0 3.7 18h16.6a1.5 1.5 0 0 0 .9-2.6z"/></svg>',
  gota: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
  flechas: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4"/></svg>',
  qr: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v7h-4M14 18v3"/></svg>',
  correo: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.9A8 8 0 1 1 21 12z"/></svg>',
  ubicacion: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  enlace: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>'
};

/* 4. IMÁGENES ALTERNATIVAS --------------------------------------------------
   Si una foto no carga, se reemplaza por un recuadro con ícono y nombre.   */
function aplicarFallback(img) {
  const alternativa = document.createElement('div');
  alternativa.className = 'img-fallback';
  alternativa.setAttribute('role', 'img');
  alternativa.setAttribute('aria-label', img.alt || 'Imagen no disponible');
  alternativa.innerHTML = `${ICONOS.percha}<span>${img.dataset.fallback || 'Imagen no disponible'}</span>`;
  img.replaceWith(alternativa);
}

function prepararImagenes(contexto = document) {
  $$('img[data-fallback]', contexto).forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
      aplicarFallback(img); // Ya falló antes de que el script cargara
    } else {
      img.addEventListener('error', () => aplicarFallback(img), { once: true });
    }
  });
}

/* 5. CATÁLOGO: TARJETAS, BUSCADOR Y FILTROS -------------------------------- */
const grid = $('#gridProductos');
const sinResultados = $('#sinResultados');
const contador = $('#contadorResultados');
const buscador = $('#buscador');
const filtroTalla = $('#filtroTalla');
const filtroEstado = $('#filtroEstado');
const filtroPrecio = $('#filtroPrecio');
const precioValor = $('#precioValor');

/* Rango de precios calculado a partir del catálogo (en pasos de ₡500) */
const precios = PRODUCTOS.map((p) => p.precio);
const PRECIO_MIN = Math.floor(Math.min(...precios) / 500) * 500;
const PRECIO_MAX = Math.ceil(Math.max(...precios) / 500) * 500;

/* Estado actual de los filtros */
const filtros = {
  texto: '',
  categoria: 'todas',
  talla: 'todas',
  estado: 'todos',
  precioMax: PRECIO_MAX
};

/* Crea el HTML de una tarjeta de producto */
function crearTarjeta(p, indice) {
  const descuento = calcularDescuento(p);
  return `
    <article class="product-card" style="--i:${indice}">
      <div class="product-card__media">
        <img src="${p.imagenes[0]}" alt="${p.alt}" loading="lazy" data-fallback="${p.nombre}">
        <span class="badge badge--${slug(p.estado)}">${p.estado}</span>
        ${descuento ? `<span class="badge badge--descuento">-${descuento}%</span>` : ''}
      </div>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span>${p.categoria}</span>
          <span class="code">${p.codigo}</span>
        </div>
        <h3 class="product-card__title">${p.nombre}</h3>
        <p class="product-card__desc">${p.descripcion}</p>

        <ul class="specs">
          <li><span>Talla</span><strong>${p.talla}</strong></li>
          <li><span>Estado</span><strong>${p.estado}</strong></li>
          <li><span>Material</span><strong>${p.material}</strong></li>
        </ul>

        <div class="product-card__extra">
          <p>${ICONOS.gota}<span><strong>Cuidado:</strong> ${p.cuidados[0]}.</span></p>
          <p>${ICONOS.flechas}<span><strong>Devolución:</strong> ${CONFIG.devolucionCorta}.</span></p>
        </div>

        <div class="price">
          <span class="price__now">${formatearPrecio(p.precio)}</span>
          ${descuento ? `<span class="price__old">${formatearPrecio(p.precioAnterior)}</span>` : ''}
        </div>

        <div class="product-card__actions">
          <button type="button" class="btn btn--outline btn--sm" data-accion="detalles" data-id="${p.codigo}">Ver detalles</button>
          <button type="button" class="btn btn--primary btn--sm" data-accion="interes" data-id="${p.codigo}">Me interesa</button>
        </div>
      </div>
    </article>`;
}

/* Devuelve los productos que cumplen todos los filtros */
function filtrarProductos() {
  const texto = normalizar(filtros.texto);
  const textoCodigo = texto.replace(/[^a-z0-9]/g, ''); // "rm 003", "rm003" o "RM-003"

  return PRODUCTOS.filter((p) => {
    const coincideTexto =
      !texto ||
      normalizar(p.nombre).includes(texto) ||
      (textoCodigo && normalizar(p.codigo).replace(/[^a-z0-9]/g, '').includes(textoCodigo));
    const coincideCategoria = filtros.categoria === 'todas' || normalizar(p.categoria) === filtros.categoria;
    const coincideTalla = filtros.talla === 'todas' || p.talla === filtros.talla;
    const coincideEstado = filtros.estado === 'todos' || p.estado === filtros.estado;
    const coincidePrecio = p.precio <= filtros.precioMax;

    return coincideTexto && coincideCategoria && coincideTalla && coincideEstado && coincidePrecio;
  });
}

/* Dibuja el catálogo según los filtros actuales */
function renderCatalogo() {
  const resultado = filtrarProductos();

  grid.innerHTML = resultado.map(crearTarjeta).join('');
  prepararImagenes(grid);

  sinResultados.hidden = resultado.length > 0;
  contador.textContent =
    resultado.length === PRODUCTOS.length
      ? `Mostrando las ${PRODUCTOS.length} prendas del catálogo`
      : `Mostrando ${resultado.length} de ${PRODUCTOS.length} prendas`;
}

/* Llena el selector de tallas con las tallas existentes (letras primero) */
function cargarTallas() {
  const ordenLetras = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const tallas = [...new Set(PRODUCTOS.map((p) => p.talla))].sort((a, b) => {
    const ia = ordenLetras.indexOf(a);
    const ib = ordenLetras.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return Number(a) - Number(b);
  });

  tallas.forEach((talla) => {
    const opcion = document.createElement('option');
    opcion.value = talla;
    opcion.textContent = isNaN(talla) ? talla : `${talla} (numérica)`;
    filtroTalla.appendChild(opcion);
  });
}

/* Configura el control deslizante de precio */
function configurarRangoPrecio() {
  filtroPrecio.min = PRECIO_MIN;
  filtroPrecio.max = PRECIO_MAX;
  filtroPrecio.value = PRECIO_MAX;
  precioValor.textContent = formatearPrecio(PRECIO_MAX);
}

/* Marca visualmente la categoría elegida */
function activarChip(categoria) {
  $$('.chip').forEach((chip) => {
    const activo = chip.dataset.categoria === categoria;
    chip.classList.toggle('is-active', activo);
    chip.setAttribute('aria-pressed', activo);
  });
}

/* Vuelve todos los filtros a su valor inicial */
function limpiarFiltros() {
  filtros.texto = '';
  filtros.categoria = 'todas';
  filtros.talla = 'todas';
  filtros.estado = 'todos';
  filtros.precioMax = PRECIO_MAX;

  buscador.value = '';
  filtroTalla.value = 'todas';
  filtroEstado.value = 'todos';
  configurarRangoPrecio();
  activarChip('todas');
  renderCatalogo();
}

function iniciarFiltros() {
  buscador.addEventListener('input', () => {
    filtros.texto = buscador.value;
    renderCatalogo();
  });

  $$('.chip').forEach((chip) =>
    chip.addEventListener('click', () => {
      filtros.categoria = chip.dataset.categoria;
      activarChip(filtros.categoria);
      renderCatalogo();
    })
  );

  filtroTalla.addEventListener('change', () => {
    filtros.talla = filtroTalla.value;
    renderCatalogo();
  });

  filtroEstado.addEventListener('change', () => {
    filtros.estado = filtroEstado.value;
    renderCatalogo();
  });

  filtroPrecio.addEventListener('input', () => {
    filtros.precioMax = Number(filtroPrecio.value);
    precioValor.textContent = formatearPrecio(filtros.precioMax);
    renderCatalogo();
  });

  $('#limpiarFiltros').addEventListener('click', limpiarFiltros);
  $('#sinResultadosLimpiar').addEventListener('click', limpiarFiltros);

  /* Botones de las tarjetas (un solo "escuchador" para todo el catálogo) */
  grid.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-accion]');
    if (!boton) return;
    if (boton.dataset.accion === 'detalles') abrirFicha(boton.dataset.id);
    if (boton.dataset.accion === 'interes') meInteresa(boton.dataset.id);
  });
}

/* 6. FICHA DIGITAL (VENTANA MODAL) ----------------------------------------- */
const modal = $('#modalFicha');
const fichaContenido = $('#fichaContenido');
let elementoAnterior = null; // Para devolver el foco al cerrar

/* Enlace directo a la ficha (lo que abriría un código QR en el futuro) */
const enlaceFicha = (codigo) => `${location.href.split('#')[0]}#ficha-${codigo}`;

function crearFicha(p) {
  const descuento = calcularDescuento(p);

  const miniaturas = p.imagenes
    .map(
      (src, i) => `
      <button type="button" class="ficha__thumb ${i === 0 ? 'is-active' : ''}" data-src="${src}" aria-label="Ver foto ${i + 1} de ${p.imagenes.length}">
        <img src="${src}" alt="" loading="lazy" data-fallback="Foto ${i + 1}">
      </button>`
    )
    .join('');

  const filasMedidas = Object.entries(p.medidas)
    .map(([nombre, valor]) => `<tr><th scope="row">${nombre}</th><td>${valor}</td></tr>`)
    .join('');

  const listaCuidados = p.cuidados.map((c) => `<li>${c}.</li>`).join('');

  return `
    <div class="ficha__galeria">
      <div class="ficha__principal" id="fichaPrincipal">
        <img src="${p.imagenes[0]}" alt="${p.alt}" data-fallback="${p.nombre}">
      </div>
      <div class="ficha__thumbs">${miniaturas}</div>
    </div>

    <div class="ficha__info">
      <span class="eyebrow">Ficha digital · ${p.categoria}</span>
      <h2 id="fichaTitulo">${p.nombre}</h2>
      <p class="ficha__codigo">Código de inventario: <span class="code">${p.codigo}</span></p>

      <div class="price">
        <span class="price__now">${formatearPrecio(p.precio)}</span>
        ${descuento ? `<span class="price__old">${formatearPrecio(p.precioAnterior)}</span><span class="badge badge--descuento">-${descuento}%</span>` : ''}
      </div>

      <p class="ficha__desc">${p.descripcion}</p>

      <div class="ficha__estado">
        <span class="badge badge--${slug(p.estado)}">${p.estado}</span>
        <p>${ESTADOS[p.estado]}</p>
      </div>

      <dl class="ficha__datos">
        <div><dt>Talla</dt><dd>${p.talla}</dd></div>
        <div><dt>Material</dt><dd>${p.material}</dd></div>
        <div><dt>Categoría</dt><dd>${p.categoria}</dd></div>
      </dl>

      <h3>Medidas de referencia</h3>
      <table class="medidas">
        <tbody>${filasMedidas}</tbody>
      </table>
      <p class="nota">Medidas tomadas con la prenda extendida sobre una superficie plana. Valores de ejemplo para este prototipo.</p>

      <h3>Recomendaciones de cuidado</h3>
      <ul class="cuidados">${listaCuidados}</ul>

      <h3>Condiciones de devolución</h3>
      <p class="ficha__desc">${CONFIG.devolucion}</p>

      <div class="ficha__qr">
        ${ICONOS.qr}
        <p><strong>Conoce tu prenda:</strong> en la versión completa de ReModa, esta ficha podría abrirse escaneando un código QR en la etiqueta de la prenda.</p>
      </div>

      <div class="ficha__acciones">
        <button type="button" class="btn btn--primary" data-accion="interes" data-id="${p.codigo}">Me interesa</button>
        <button type="button" class="btn btn--outline" data-accion="copiar" data-id="${p.codigo}">${ICONOS.enlace} Copiar enlace de la ficha</button>
      </div>
    </div>`;
}

function abrirFicha(codigo) {
  const producto = buscarProducto(codigo);
  if (!producto) return;

  elementoAnterior = document.activeElement;
  fichaContenido.innerHTML = crearFicha(producto);
  prepararImagenes(fichaContenido);

  modal.hidden = false;
  void modal.offsetWidth; // Fuerza al navegador a aplicar la animación de entrada
  modal.classList.add('is-open');
  document.body.classList.add('no-scroll');
  $('.modal__dialog', modal).scrollTop = 0;

  history.replaceState(null, '', `#ficha-${producto.codigo}`);
  $('.modal__close', modal).focus();
}

function cerrarFicha() {
  if (modal.hidden) return;
  modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  history.replaceState(null, '', location.pathname + location.search);

  setTimeout(() => {
    modal.hidden = true;
    fichaContenido.innerHTML = '';
  }, 250);

  if (elementoAnterior) elementoAnterior.focus();
}

/* Cambia la foto principal al tocar una miniatura */
function cambiarFoto(miniatura) {
  const producto = buscarProducto($('[data-accion="interes"]', fichaContenido).dataset.id);
  const principal = $('#fichaPrincipal');
  principal.innerHTML = `<img src="${miniatura.dataset.src}" alt="${producto.alt}" data-fallback="${producto.nombre}">`;
  prepararImagenes(principal);

  $$('.ficha__thumb', fichaContenido).forEach((t) => t.classList.remove('is-active'));
  miniatura.classList.add('is-active');
}

async function copiarEnlace(codigo) {
  const enlace = enlaceFicha(codigo);
  try {
    await navigator.clipboard.writeText(enlace);
    mostrarToast('Enlace de la ficha copiado. Puedes compartirlo o pegarlo en el navegador.');
  } catch {
    mostrarToast(`Copia este enlace: ${enlace}`);
  }
}

/* Abre la ficha si la dirección termina en #ficha-RM-00X */
function revisarEnlaceDeFicha() {
  const coincidencia = location.hash.match(/^#ficha-(RM-\d{3})$/i);
  if (coincidencia) abrirFicha(coincidencia[1].toUpperCase());
}

function iniciarFicha() {
  /* Cerrar con la X o haciendo clic fuera de la ficha */
  modal.addEventListener('click', (evento) => {
    if (evento.target.closest('[data-cerrar]')) cerrarFicha();
  });

  /* Botones dentro de la ficha */
  fichaContenido.addEventListener('click', (evento) => {
    const miniatura = evento.target.closest('.ficha__thumb');
    if (miniatura) return cambiarFoto(miniatura);

    const boton = evento.target.closest('[data-accion]');
    if (!boton) return;
    if (boton.dataset.accion === 'interes') {
      const codigo = boton.dataset.id;
      cerrarFicha();
      meInteresa(codigo);
    }
    if (boton.dataset.accion === 'copiar') copiarEnlace(boton.dataset.id);
  });

  /* Cerrar con la tecla Escape */
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
      cerrarFicha();
      cerrarMenu();
    }
  });

  /* Botón "Ver una ficha de ejemplo" de la sección Conoce tu prenda */
  const btnEjemplo = $('#btnFichaEjemplo');
  btnEjemplo.addEventListener('click', () => abrirFicha(btnEjemplo.dataset.id));

  window.addEventListener('hashchange', revisarEnlaceDeFicha);
}

/* 7. "ME INTERESA", WHATSAPP Y FORMULARIO ---------------------------------- */
function abrirWhatsApp(mensaje) {
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank', 'noopener');
}

/* Prepara una consulta sobre la prenda elegida */
function meInteresa(codigo) {
  const p = buscarProducto(codigo);
  if (!p) return;

  const mensaje = `Hola, ReModa. Me interesa la prenda "${p.nombre}" (código ${p.codigo}, talla ${p.talla}, ${formatearPrecio(p.precio)}). ¿Sigue disponible?`;

  if (CONFIG.whatsapp) {
    abrirWhatsApp(mensaje);
    return;
  }

  /* Sin WhatsApp configurado: se completa el formulario de contacto */
  $('#mensaje').value = mensaje;
  limpiarError($('#mensaje'));
  $('#contacto').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => $('#nombre').focus({ preventScroll: true }), 700);
  mostrarToast(`Preparamos tu consulta sobre ${p.codigo} en el formulario de contacto.`);
}

function iniciarWhatsApp() {
  const boton = $('#btnWhatsApp');
  const aviso = $('#avisoWhatsApp');

  if (!CONFIG.whatsapp) aviso.hidden = false;

  boton.addEventListener('click', () => {
    if (CONFIG.whatsapp) {
      abrirWhatsApp('Hola, ReModa. Quisiera consultar por la disponibilidad de una prenda.');
    } else {
      mostrarToast('El WhatsApp de la tienda aún no está disponible. Puedes escribirnos con el formulario.');
      $('#nombre').focus();
    }
  });
}

/* Validación del formulario */
function mostrarError(campo, texto) {
  const contenedor = campo.closest('.form-field');
  contenedor.classList.add('has-error');
  $('.form-error', contenedor).textContent = texto;
}

function limpiarError(campo) {
  const contenedor = campo.closest('.form-field');
  contenedor.classList.remove('has-error');
  $('.form-error', contenedor).textContent = '';
}

function mostrarEstadoFormulario(texto, tipo) {
  const estado = $('#estadoFormulario');
  estado.textContent = texto;
  estado.className = `form-status form-status--${tipo}`;
  estado.hidden = false;
}

function iniciarFormulario() {
  const form = $('#formContacto');
  const nombre = $('#nombre');
  const correo = $('#correo');
  const mensaje = $('#mensaje');

  [nombre, correo, mensaje].forEach((campo) => campo.addEventListener('input', () => limpiarError(campo)));

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let valido = true;

    if (nombre.value.trim().length < 2) {
      mostrarError(nombre, 'Escribe tu nombre.');
      valido = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.value.trim())) {
      mostrarError(correo, 'Escribe un correo electrónico válido.');
      valido = false;
    }
    if (mensaje.value.trim().length < 10) {
      mostrarError(mensaje, 'Cuéntanos un poco más (mínimo 10 caracteres).');
      valido = false;
    }
    if (!valido) return;

    const texto = `Nombre: ${nombre.value.trim()}\nCorreo: ${correo.value.trim()}\n\n${mensaje.value.trim()}`;

    /* Solo se "envía" si existe un medio real configurado */
    if (CONFIG.correo) {
      const asunto = encodeURIComponent(`Consulta desde ReModa - ${nombre.value.trim()}`);
      location.href = `mailto:${CONFIG.correo}?subject=${asunto}&body=${encodeURIComponent(texto)}`;
      mostrarEstadoFormulario('Se abrió tu aplicación de correo con el mensaje listo. Solo falta presionar “Enviar”.', 'ok');
    } else if (CONFIG.whatsapp) {
      abrirWhatsApp(texto);
      mostrarEstadoFormulario('Abrimos WhatsApp con tu mensaje listo. Solo falta presionar “Enviar”.', 'ok');
    } else {
      mostrarEstadoFormulario(
        'Tu mensaje está listo, pero este prototipo todavía no tiene un medio de envío conectado. ' +
        'Cuando la tienda publique su correo o WhatsApp, este botón lo enviará por ese medio.',
        'info'
      );
    }
  });
}

/* 8. NAVEGACIÓN, ANIMACIONES Y PIE DE PÁGINA ------------------------------- */
const nav = $('#nav');
const navToggle = $('#navToggle');

function cerrarMenu() {
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
}

function iniciarNavegacion() {
  /* Menú de celular */
  navToggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', abierto);
    navToggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  /* Cerrar el menú al elegir una opción o tocar fuera */
  $$('a', nav).forEach((enlace) => enlace.addEventListener('click', cerrarMenu));
  document.addEventListener('click', (evento) => {
    if (!nav.contains(evento.target) && !navToggle.contains(evento.target)) cerrarMenu();
  });

  /* Sombra del encabezado al bajar */
  const header = $('#header');
  const actualizarHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', actualizarHeader, { passive: true });
  actualizarHeader();

  /* Resalta en el menú la sección visible */
  if ('IntersectionObserver' in window) {
    const enlaces = $$('.nav__link');
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          enlaces.forEach((enlace) =>
            enlace.classList.toggle('is-active', enlace.getAttribute('href') === `#${entrada.target.id}`)
          );
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['inicio', 'catalogo', 'como-funciona', 'contacto'].forEach((id) => observador.observe(document.getElementById(id)));
  }
}

/* Animación de aparición al hacer scroll */
function iniciarAnimaciones() {
  const elementos = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  elementos.forEach((el) => observador.observe(el));
}

/* Datos de contacto del pie de página (desde CONFIG) */
function iniciarPiePagina() {
  const lista = $('#footerContacto');
  const items = [];

  items.push(
    CONFIG.whatsapp
      ? `<li>${ICONOS.chat}<a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp: +${CONFIG.whatsapp}</a></li>`
      : `<li>${ICONOS.chat}<span>WhatsApp: próximamente</span></li>`
  );
  items.push(
    CONFIG.correo
      ? `<li>${ICONOS.correo}<a href="mailto:${CONFIG.correo}">${CONFIG.correo}</a></li>`
      : `<li>${ICONOS.correo}<span>Correo: próximamente</span></li>`
  );
  if (CONFIG.instagram) {
    items.push(`<li>${ICONOS.enlace}<a href="${CONFIG.instagram}" target="_blank" rel="noopener">Redes sociales</a></li>`);
  }
  items.push(`<li>${ICONOS.ubicacion}<span>${CONFIG.ubicacion}</span></li>`);

  lista.innerHTML = items.join('');

  $('#anioActual').textContent = new Date().getFullYear();
  $('#btnArriba').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* 9. INICIO DE LA PÁGINA --------------------------------------------------- */
function iniciar() {
  $('#precioDesde').textContent = formatearPrecio(Math.min(...precios));

  prepararImagenes();     // Imágenes fijas del HTML
  cargarTallas();
  configurarRangoPrecio();
  iniciarFiltros();
  renderCatalogo();
  iniciarFicha();
  iniciarWhatsApp();
  iniciarFormulario();
  iniciarNavegacion();
  iniciarAnimaciones();
  iniciarPiePagina();
  revisarEnlaceDeFicha(); // Abre una ficha si se llegó con un enlace directo
}

document.addEventListener('DOMContentLoaded', iniciar);
