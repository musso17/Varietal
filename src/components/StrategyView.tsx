import React, { useState } from 'react';
import { Target, Users, Zap, BookOpen, Video, LayoutGrid, Film, ChevronDown, ChevronUp, Palette, Music, Type, AlertCircle, Repeat } from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const MES2_VIDEOS = [
  {
    id: 'v1',
    num: '01',
    title: 'Los 3 filtrados',
    objective: 'Presentar la propuesta diferencial de Varietal (café de especialidad por origen) a alguien que no sabe qué es un filtrado.',
    format: 'Reel vertical 9:16 · 30–45 seg',
    isRecurring: false,
    shots: [
      'Apertura: agua cayendo sobre el café molido — macro, contraluz si es posible',
      'El chorro del filtrado cayendo a la taza — slow motion o tiempo real según ritmo',
      'Las 3 tazas en fila sobre la barra — plano cenital, limpio, sin props innecesarios',
      'Una mano tomando una taza — plano medio, no se ve la cara',
    ],
    montage: 'Lento en la apertura, acelera levemente en el medio, cierra estático.',
    color: 'Tonos tierra. Desaturar los neutros (barra, taza), mantener el café cálido. Sin filtros de Instagram. Que se vea elaborado, no filtrado.',
    audio: 'Sonido ambiente del proceso + música instrumental minimalista (sin letra). El goteo debe escucharse.',
    onscreen: '"Tres orígenes. Tres caracteres. Uno es el tuyo." — Cierre: nombre del lugar + dirección o "disponibles hoy"',
    caption: null,
    donts: ['No mostrar precio', 'No narración en voz', 'No zoom rápido ni transiciones con efecto'],
  },
  {
    id: 'v2',
    num: '02',
    title: 'El matcha',
    objective: 'Capturar a quien no va a Varietal por café. El matcha es el gancho de sorpresa — diferencia a la barra de cualquier cafetería genérica.',
    format: 'Reel vertical · 20–30 seg',
    isRecurring: false,
    shots: [
      'El polvo de matcha en el bowl — macro, el verde debe dominar el encuadre',
      'El batido: movimiento circular del chasen — plano detalle, enfoque en la espuma',
      'El matcha terminado en taza — plano cenital o 3/4, superficie lisa y brillante',
      'La taza sobre la barra junto a otra taza de café — contrapunto visual: verde vs. café',
    ],
    montage: 'Fluido, sin cortes abruptos. Este video respira más que el de filtrados.',
    color: 'El verde del matcha es el protagonista. No lo apagues con la corrección. Todo lo demás puede estar frío o neutro — que el matcha contraste.',
    audio: 'Sin música con letra. Algo ambiental suave o solo sonido del lugar. El batido debe escucharse.',
    onscreen: '"No viniste por el café. Está bien." — Cierre: nombre del lugar',
    caption: '"El matcha tiene su propio ritual. El nuestro también."',
    donts: [],
  },
  {
    id: 'v3',
    num: '03',
    title: 'Espresso + cortado',
    objective: 'El café más accesible del menú. Este video habla con quien no quiere complicarse — solo un buen café rápido.',
    format: 'Reel vertical · 20–30 seg (ritmo más rápido)',
    isRecurring: false,
    shots: [
      'La palanca bajando o el botón del espresso — plano detalle',
      'El chorro del espresso en taza pequeña — macro, el crema visible',
      'La leche cayendo en el cortado — lento si es posible, la mezcla de colores',
      'La taza terminada sobre la barra — plano limpio, sin manos',
    ],
    montage: 'El más dinámico de los 4 videos. Cortes más rápidos, pero sin caer en ritmo de TikTok acelerado. Que se sienta ágil, no ansioso.',
    color: 'Más contraste que los anteriores. El espresso puede tener más calidez, los blancos más limpios.',
    audio: 'Puede tener un beat más marcado — algo que acompañe el ritmo del montaje sin ser comercial.',
    onscreen: '"El café que no necesita explicación."',
    caption: null,
    donts: [],
  },
  {
    id: 'v4',
    num: '04',
    title: 'Café del día',
    objective: 'Generar visitas recurrentes. Este es el único video que se repite cada mes con pequeñas variaciones — lo que cambia es el café, no el formato.',
    format: 'Reel o Story vertical · 20–30 seg',
    isRecurring: true,
    shots: [
      'Plano del empaque o etiqueta del café de esa semana — nombre del origen visible',
      'El café molido en el portafiltro — macro',
      'Barista (sin cara necesaria, puede ser solo manos y torso) preparando',
      'Taza terminada + texto con las notas de sabor',
    ],
    montage: 'Estructura fija que se repite cada mes. Lo que cambia es el café, no el formato.',
    color: 'Consistente con la identidad visual de Varietal — tono cálido, limpio.',
    audio: 'Sonido ambiente del proceso.',
    onscreen: 'CAFÉ DEL DÍA\n[País de origen]\nNotas: [sabor 1], [sabor 2], [sabor 3]\nDisponible esta semana.',
    caption: null,
    donts: [],
  },
];

const MES2_CARRUSELES = [
  {
    id: 'c1',
    num: '01',
    semana: 'Semana 1',
    title: 'Cómo se hace un filtrado',
    format: '6–8 slides',
    objective: 'Educación + credibilidad. El espectador que no sabe qué es un filtrado termina queriendo probar uno.',
    slides: [
      { label: 'Cover', desc: 'Plano del filtrado en proceso, agua cayendo.', copy: '"No es café de máquina."' },
      { label: 'El molido', desc: 'Macro del café recién molido en el dosificador.', copy: '"Todo empieza con el grano correcto."' },
      { label: 'El bloom', desc: 'El primer chorro de agua sobre el café.', copy: '"30 segundos de espera. El café libera sus gases. Se llama bloom."' },
      { label: 'El goteo', desc: 'Plano del chorro cayendo a la taza.', copy: '"El agua hace el trabajo. Solo necesita tiempo."' },
      { label: 'El resultado', desc: 'La taza terminada, limpia, sin adornos.', copy: '"Sin leche. Sin azúcar. Solo el café."' },
      { label: 'Cierre', desc: 'Las 3 tazas en fila.', copy: '"Tres orígenes disponibles hoy. Ven a elegir el tuyo."' },
    ],
    photo: 'Luz natural o difusa. Sin flash. Fondo neutro o la barra de Varietal. Cada slide debe poder leerse sola.',
    typo: 'Sans-serif limpia. Texto chico, no centrado necesariamente. Que respire.',
  },
  {
    id: 'c2',
    num: '02',
    semana: 'Semana 2',
    title: 'El matcha desde todos los ángulos',
    format: '6 slides — producto hero puro',
    objective: 'No es educativo. Es visual. Que el matcha se vea tan bueno que alguien lo guarde o lo mande a un amigo.',
    slides: [
      { label: 'Cover', desc: 'El matcha terminado en taza, cenital. Verde saturado.', copy: '"Matcha." (o sin texto)' },
      { label: 'El polvo', desc: 'Macro del polvo de matcha en cuchara o bowl. Textura visible.', copy: '—' },
      { label: 'El batido', desc: 'El chasen en movimiento, levemente borroso. La espuma formándose.', copy: '—' },
      { label: 'El color', desc: 'Plano 3/4 de la taza, la superficie refleja la luz.', copy: '—' },
      { label: 'El contraste', desc: 'La taza de matcha junto a una de café. Sin texto.', copy: '—' },
      { label: 'Cierre', desc: 'La taza en manos.', copy: '"Disponible en Varietal."' },
    ],
    photo: 'Aquí el color lo es todo. No subexponer. Si la luz del local no alcanza, buscar el momento del día con mejor entrada de luz.',
    typo: 'Sin copy educativo. No explicar qué es el matcha. Que la imagen genere la pregunta.',
  },
  {
    id: 'c3',
    num: '03',
    semana: 'Semana 2',
    title: '¿Cortado o filtrado?',
    format: '4–5 slides — conversacional',
    objective: 'Generar comentarios y guardados. Este carrusel no vende directamente — construye comunidad y algoritmo.',
    slides: [
      { label: 'Cover', desc: 'Las dos tazas, una al lado de la otra.', copy: '"¿Cortado o filtrado?"' },
      { label: 'El cortado', desc: 'Solo esa taza.', copy: '"Si tienes 5 minutos y necesitas que algo funcione."' },
      { label: 'El filtrado', desc: 'Solo esa taza.', copy: '"Si tienes 15 minutos y quieres que algo se sienta bien."' },
      { label: 'El remate', desc: 'Plano de ambas sobre la barra.', copy: '"Depende del día. Los dos están aquí."' },
      { label: 'CTA', desc: '—', copy: '"¿Cuál eres tú hoy? Cuéntanos en los comentarios."' },
    ],
    photo: 'Fotografía limpia, consistente con el resto del feed.',
    typo: 'El copy no debe sonar a marca. Debe sonar a alguien que conoce el café y habla sin pretensión.',
  },
  {
    id: 'c4',
    num: '04',
    semana: 'Semana 3',
    title: 'Los 3 filtrados — texturas y colores',
    format: '6 slides — producto hero',
    objective: 'Mostrar que los filtrados no son todos iguales. Despertar curiosidad por el origen.',
    slides: [
      { label: 'Cover', desc: 'Las 3 tazas en fila, cenital.', copy: '"Tres. Elige uno."' },
      { label: 'Filtrado 1', desc: 'La taza sola.', copy: '"Etiopía — floral, cítrico."' },
      { label: 'Filtrado 2', desc: 'La taza sola.', copy: '"Colombia — caramelo, almendra."' },
      { label: 'Filtrado 3', desc: 'La taza sola.', copy: '"Guatemala — chocolate, nuez."' },
      { label: 'El proceso', desc: 'Un plano del goteo, sin especificar cuál.', copy: '"El proceso es el mismo. El resultado, no."' },
      { label: 'Cierre', desc: '—', copy: '"Disponibles esta semana. Si se acaba un origen, entra el siguiente."' },
    ],
    photo: 'Que las 3 tazas sean visualmente distintas — diferente loza, diferente nivel de líquido, diferente ángulo de luz.',
    typo: 'Texto mínimo. El origen y la nota de sabor en cada slide. Que respire.',
  },
  {
    id: 'c5',
    num: '05',
    semana: 'Semana 3',
    title: 'El lugar',
    format: '5–7 slides — ambiente',
    objective: 'Que alguien que nunca fue a Varietal entienda qué se siente estar ahí. Sin personas, sin producto. Solo el espacio.',
    slides: [
      { label: 'Cover', desc: 'El plano más editorial del local. La barra vacía, la luz entrando, un detalle arquitectónico.', copy: '—' },
      { label: 'Detalle 1', desc: 'Algo que nadie nota si no va: una grieta estética, la textura de la barra, el handle de una taza.', copy: '—' },
      { label: 'Detalle 2', desc: 'La luz a cierta hora del día — la hora donde el local se ve especialmente bien.', copy: '—' },
      { label: 'Detalle 3', desc: 'Un objeto del espacio que tenga carácter: una planta, un objeto en la barra, el empaque de un café.', copy: '—' },
      { label: 'Cierre', desc: 'Plano general o semigeneral del local vacío.', copy: 'Horarios y dirección, limpio.' },
    ],
    photo: 'El riesgo es que se vea como foto de bienes raíces. Buscar el ángulo que hace que el espacio se vea vivido, no exhibido. Luz natural siempre que sea posible.',
    typo: 'Mínimo texto. Solo el cierre lleva copy.',
  },
  {
    id: 'c6',
    num: '06',
    semana: 'Semana 4',
    title: 'El espresso: del grano a la taza',
    format: '5–6 slides — proceso',
    objective: 'Mismo formato que el carrusel de filtrados pero para el espresso. Credibilidad técnica + accesibilidad.',
    slides: [
      { label: 'Cover', desc: 'El espresso en taza, el crema visible.', copy: '"Dos minutos. Sin apuro."' },
      { label: 'El grano', desc: 'Los granos antes del molido. Macro.', copy: '—' },
      { label: 'El dosificado', desc: 'El café en el portafiltro, antes de prensar.', copy: '—' },
      { label: 'El prensado', desc: 'La mano sobre el tamper. Plano detalle.', copy: '—' },
      { label: 'La extracción', desc: 'El chorro del espresso cayendo. Macro si es posible.', copy: '—' },
      { label: 'La taza', desc: 'Plano final, limpio.', copy: '"Café de Varietal." + dirección.' },
    ],
    photo: 'Consistente con el carrusel de filtrados — misma paleta, misma limpieza.',
    typo: 'Sans-serif limpia. Solo los hitos del proceso llevan copy.',
  },
  {
    id: 'c7',
    num: '07',
    semana: 'Semana 4',
    title: 'Qué hay esta semana',
    format: '4 slides — acción directa',
    objective: 'Cierre del mes. Convertir atención en visita.',
    slides: [
      { label: 'Cover', desc: 'Foto limpia de producto.', copy: '"Esta semana en Varietal."' },
      { label: 'Café del día', desc: 'Nombre del origen, notas de sabor. Misma identidad visual que el video recurrente.', copy: '—' },
      { label: 'El menú', desc: 'Los 3 filtrados, espresso, cortado, matcha.', copy: 'Sin precios si no quieren, o con precios si ya están listos.' },
      { label: 'Cierre', desc: 'Dirección, horarios, días de apertura.', copy: '"Te esperamos."' },
    ],
    photo: 'Este carrusel es el más funcional del mes. No tiene que ser el más lindo — tiene que ser el más claro.',
    typo: 'Claro y directo. Jerarquía visual evidente.',
  },
];

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

interface VideoCardProps {
  video: typeof MES2_VIDEOS[0];
  isOpen: boolean;
  onToggle: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isOpen, onToggle }) => (
  <div className={`brief-card ${isOpen ? 'brief-card--open' : ''}`}>
    <button className="brief-header" onClick={onToggle}>
      <div className="brief-header-left">
        <span className="brief-num">{video.num}</span>
        <div>
          <div className="brief-title">{video.title}</div>
          <div className="brief-meta">
            <span className="brief-format-tag"><Film size={10} /> {video.format}</span>
            {video.isRecurring && <span className="brief-recurring-tag"><Repeat size={10} /> Formato recurrente</span>}
          </div>
        </div>
      </div>
      <span className="brief-chevron">{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
    </button>

    {isOpen && (
      <div className="brief-body">
        <div className="brief-objective">
          <Target size={12} />
          <span>{video.objective}</span>
        </div>

        <div className="brief-sections">
          <div className="brief-section">
            <div className="brief-section-label"><Film size={11} /> Estructura de planos</div>
            <ol className="brief-shots">
              {video.shots.map((s, i) => (
                <li key={i}><span className="shot-num">{i + 1}</span>{s}</li>
              ))}
            </ol>
          </div>

          <div className="brief-row-3">
            <div className="brief-section">
              <div className="brief-section-label"><LayoutGrid size={11} /> Montaje</div>
              <p className="brief-text">{video.montage}</p>
            </div>
            <div className="brief-section">
              <div className="brief-section-label"><Palette size={11} /> Color</div>
              <p className="brief-text">{video.color}</p>
            </div>
            <div className="brief-section">
              <div className="brief-section-label"><Music size={11} /> Audio</div>
              <p className="brief-text">{video.audio}</p>
            </div>
          </div>

          <div className="brief-section">
            <div className="brief-section-label"><Type size={11} /> Texto en pantalla</div>
            {video.isRecurring ? (
              <pre className="brief-onscreen-pre">{video.onscreen}</pre>
            ) : (
              <p className="brief-onscreen">{video.onscreen}</p>
            )}
          </div>

          {video.caption && (
            <div className="brief-section">
              <div className="brief-section-label">Copy del post (caption)</div>
              <p className="brief-caption">"{video.caption}"</p>
            </div>
          )}

          {video.donts.length > 0 && (
            <div className="brief-section brief-donts">
              <div className="brief-section-label"><AlertCircle size={11} /> Lo que NO hacer</div>
              <ul className="brief-donts-list">
                {video.donts.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

interface CarouselCardProps {
  car: typeof MES2_CARRUSELES[0];
  isOpen: boolean;
  onToggle: () => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ car, isOpen, onToggle }) => (
  <div className={`brief-card ${isOpen ? 'brief-card--open' : ''}`}>
    <button className="brief-header" onClick={onToggle}>
      <div className="brief-header-left">
        <span className="brief-num">{car.num}</span>
        <div>
          <div className="brief-title">{car.title}</div>
          <div className="brief-meta">
            <span className="brief-semana-tag">{car.semana}</span>
            <span className="brief-format-tag"><LayoutGrid size={10} /> {car.format}</span>
          </div>
        </div>
      </div>
      <span className="brief-chevron">{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
    </button>

    {isOpen && (
      <div className="brief-body">
        <div className="brief-objective">
          <Target size={12} />
          <span>{car.objective}</span>
        </div>

        <div className="brief-sections">
          <div className="brief-section">
            <div className="brief-section-label"><LayoutGrid size={11} /> Estructura de slides</div>
            <div className="slides-grid">
              {car.slides.map((s, i) => (
                <div key={i} className="slide-item">
                  <div className="slide-num">{i + 1}</div>
                  <div className="slide-content">
                    <div className="slide-label">{s.label}</div>
                    {s.desc !== '—' && <div className="slide-desc">{s.desc}</div>}
                    {s.copy !== '—' && <div className="slide-copy">{s.copy}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brief-row-2">
            <div className="brief-section">
              <div className="brief-section-label"><Palette size={11} /> Fotografía</div>
              <p className="brief-text">{car.photo}</p>
            </div>
            <div className="brief-section">
              <div className="brief-section-label"><Type size={11} /> Tipografía / Copy</div>
              <p className="brief-text">{car.typo}</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

type StrategyTab = 'overview' | 'videos' | 'carruseles';

export const StrategyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StrategyTab>('overview');
  const [openVideo, setOpenVideo] = useState<string | null>('v1');
  const [openCarousel, setOpenCarousel] = useState<string | null>('c1');

  const toggleVideo = (id: string) => setOpenVideo(prev => prev === id ? null : id);
  const toggleCarousel = (id: string) => setOpenCarousel(prev => prev === id ? null : id);

  return (
    <div className="strategy-container">

      {/* ── Strategy Tabs ── */}
      <div className="strategy-tabs">
        <button
          className={`strategy-tab ${activeTab === 'overview' ? 'strategy-tab--active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BookOpen size={14} /> Estrategia
        </button>
        <button
          className={`strategy-tab ${activeTab === 'videos' ? 'strategy-tab--active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <Video size={14} /> Videos · Mes 2
          <span className="strategy-tab-badge">4</span>
        </button>
        <button
          className={`strategy-tab ${activeTab === 'carruseles' ? 'strategy-tab--active' : ''}`}
          onClick={() => setActiveTab('carruseles')}
        >
          <LayoutGrid size={14} /> Carruseles · Mes 2
          <span className="strategy-tab-badge">7</span>
        </button>
      </div>

      {/* ════ TAB: OVERVIEW ════ */}
      {activeTab === 'overview' && (
        <>
          <div className="strategy-grid">
            <div className="strategy-card main-vision">
              <div className="card-tag">Estrategia Varietal 2026</div>
              <h2 className="strategy-h2">Objetivos de Marca</h2>
              <div className="objectives-list">
                <div className="obj-item">
                  <div className="obj-icon"><Target size={18} /></div>
                  <div>
                    <div className="obj-title">Posicionamiento como Barra</div>
                    <div className="obj-desc">Consolidar a Varietal como la barra de café referente en Barranco, no solo como tostaduría.</div>
                  </div>
                </div>
                <div className="obj-item">
                  <div className="obj-icon"><Zap size={18} /></div>
                  <div>
                    <div className="obj-title">Educación al Consumidor</div>
                    <div className="obj-desc">Traducir la complejidad técnica del tueste a un lenguaje visual atractivo y digerible.</div>
                  </div>
                </div>
                <div className="obj-item">
                  <div className="obj-icon"><Users size={18} /></div>
                  <div>
                    <div className="obj-title">El Point de Barranco</div>
                    <div className="obj-desc">Construir comunidad para que los vecinos identifiquen a Varietal como su punto de encuentro diario.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="strategy-card">
              <h2 className="strategy-h2">Pilares de Contenido</h2>
              <div className="pilars-grid">
                <div className="pilar-item tostaduria">
                  <div className="pilar-name">Tostaduría</div>
                  <div className="pilar-desc">El varietal como protagonista. Autoridad en el tueste, perfiles sensoriales, origen y la ciencia detrás de cada grano.</div>
                  <div className="pilar-tags">#Tueste #Origen #Especialidad #Autoridad</div>
                </div>
                <div className="pilar-item barra">
                  <div className="pilar-name">La Barra</div>
                  <div className="pilar-desc">La experiencia en el salón. Servicio, hospitalidad, la interacción con el barista y el estilo de vida en Barranco.</div>
                  <div className="pilar-tags">#BarraDeCafe #Servicio #Comunidad #Barranco</div>
                </div>
              </div>
            </div>
          </div>

          <div className="strategy-card full-width">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <BookOpen className="text-accent" />
              <h2 className="strategy-h2" style={{ marginBottom: 0 }}>Menú / Carta Oficial</h2>
            </div>
            <p className="strategy-p">La oferta de productos disponible en la barra, base para la creación de contenido del Mes 2.</p>
            <div className="carta-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="carta-col">
                <div className="carta-label">Clásicos</div>
                <ul className="carta-list">
                  <li>Espresso <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/8.50</span></li>
                  <li>Americano <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/9.00</span></li>
                  <li>Bebida con Leche <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/10.00</span></li>
                  <li>Moka <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/12.00</span></li>
                </ul>
              </div>
              <div className="carta-col">
                <div className="carta-label">Fríos &amp; Cold Brew</div>
                <ul className="carta-list">
                  <li>Cold Brew <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
                  <li>Cold Brew Tonic <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/14.50</span></li>
                  <li>Cold Brew Frutas <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/14.50</span></li>
                  <li>Iced Latte <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
                  <li>Iced Moka <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
                </ul>
              </div>
              <div className="carta-col">
                <div className="carta-label">Matcha</div>
                <ul className="carta-list">
                  <li>Matcha Latte <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/14.00</span></li>
                  <li>Iced Matcha Latte <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/15.90</span></li>
                </ul>
                <div className="carta-label" style={{ marginTop: '24px' }}>Combos</div>
                <ul className="carta-list">
                  <li>Café Cal. + Croissant <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/15.00</span></li>
                  <li>Café Caliente + Canelé <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.50</span></li>
                </ul>
              </div>
              <div className="carta-col">
                <div className="carta-label">Pastelería</div>
                <ul className="carta-list">
                  <li>Galleta Chocochips <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/9.00</span></li>
                  <li>Galleta Manzana <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/9.00</span></li>
                  <li>Canelé <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/6.50</span></li>
                  <li>Croissants <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/8.00</span></li>
                  <li>Croissants Pollo <span style={{float: 'right', color: '#888', fontWeight: 600}}>S/13.00</span></li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="strategy-h2" style={{ marginTop: '40px', paddingLeft: '8px' }}>Estrategia</h2>
          <div className="roadmap-grid">
            <div className="roadmap-step">
              <div className="step-num">01</div>
              <div className="step-content">
                <div className="step-month">Mes 1: Intriga &amp; Lanzamiento</div>
                <div className="step-desc">Generar expectativa sobre la apertura. Mostrar cómo la estética clínica de Varietal se apropia del espacio en Barranco.</div>
                <div className="step-badge">#Anticipación #Barranco</div>
              </div>
            </div>
            <div className="roadmap-step active">
              <div className="step-num">02</div>
              <div className="step-content">
                <div className="step-month">Mes 2: Foco en Carta &amp; Oferta</div>
                <div className="step-desc">Profundizar en los productos reales. Dar protagonismo a las opciones de la carta — filtrados, matcha, espresso — con briefs de producción detallados.</div>
                <div className="step-badge">#Menú #Oferta</div>
              </div>
            </div>
            <div className="roadmap-step">
              <div className="step-num">03</div>
              <div className="step-content">
                <div className="step-month">Mes 3: El Point del Barrio</div>
                <div className="step-desc">Construir la comunidad local. Dejar de lado las "colabs" para enfocarnos en los vecinos y creativos de la zona que nos visitan.</div>
                <div className="step-badge">#Comunidad #Vecinos</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ════ TAB: VIDEOS ════ */}
      {activeTab === 'videos' && (
        <div className="briefs-section">
          <div className="briefs-header">
            <div>
              <h2 className="strategy-h2" style={{ marginBottom: '8px' }}>Briefs de Video — Mes 2</h2>
              <p className="strategy-p" style={{ marginBottom: 0 }}>4 reels de producción para Junio. Haz clic en cada uno para ver el brief completo.</p>
            </div>
            <div className="briefs-week-map">
              <div className="week-dot week1">S1</div>
              <div className="week-dot week2">S2</div>
              <div className="week-dot week3">S3</div>
              <div className="week-dot week4">S4</div>
            </div>
          </div>
          <div className="briefs-list">
            {MES2_VIDEOS.map(v => (
              <VideoCard
                key={v.id}
                video={v}
                isOpen={openVideo === v.id}
                onToggle={() => toggleVideo(v.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ════ TAB: CARRUSELES ════ */}
      {activeTab === 'carruseles' && (
        <div className="briefs-section">
          <div className="briefs-header">
            <div>
              <h2 className="strategy-h2" style={{ marginBottom: '8px' }}>Briefs de Carrusel — Mes 2</h2>
              <p className="strategy-p" style={{ marginBottom: 0 }}>7 carruseles distribuidos en 4 semanas. Haz clic en cada uno para ver el brief completo.</p>
            </div>
            <div className="briefs-week-legend">
              <span className="week-legend-item week1-bg">Semana 1 · 1 carrusel</span>
              <span className="week-legend-item week2-bg">Semana 2 · 2 carruseles</span>
              <span className="week-legend-item week3-bg">Semana 3 · 2 carruseles</span>
              <span className="week-legend-item week4-bg">Semana 4 · 2 carruseles</span>
            </div>
          </div>
          <div className="briefs-list">
            {MES2_CARRUSELES.map(c => (
              <CarouselCard
                key={c.id}
                car={c}
                isOpen={openCarousel === c.id}
                onToggle={() => toggleCarousel(c.id)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
