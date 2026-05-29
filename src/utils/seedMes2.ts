import { supabase } from './supabase';

const MES2_POSTS = [

  // ════════════════════════════════════════════════════════════
  // VIDEOS
  // ════════════════════════════════════════════════════════════

  {
    id: 'mes2-v01-filtrados',
    title: 'Video: Los 3 filtrados',
    type: 'video' as const,
    pilar: 'La Tostaduría' as const,
    objective: 'Posicionamiento' as const,
    status: 'idea' as const,
    date: '2026-06-04',
    link: '',
    comments: [],
    concept: `OBJETIVO
Presentar la propuesta diferencial de Varietal (café de especialidad por origen) a alguien que no sabe qué es un filtrado.

FORMATO
Reel vertical 9:16 · 30–45 seg

ESTRUCTURA DE PLANOS
1. Apertura: agua cayendo sobre el café molido — macro, contraluz si es posible
2. El chorro del filtrado cayendo a la taza — slow motion o tiempo real según ritmo
3. Las 3 tazas en fila sobre la barra — plano cenital, limpio, sin props innecesarios
4. Una mano tomando una taza — plano medio, no se ve la cara

TEXTO EN PANTALLA
"Tres orígenes. Tres caracteres. Uno es el tuyo."
Cierre: nombre del lugar + dirección o "disponibles hoy"

COPY DE PUBLICACIÓN (caption)
Tres orígenes distintos. Tres formas de sentir el café.

No es mejor ni peor — es diferente. Ven a encontrar el tuyo.

Disponibles hoy en Varietal.
📍 [dirección]

LO QUE NO HACER
✗ No mostrar precio
✗ No narración en voz
✗ No zoom rápido ni transiciones con efecto`,
    visual: `MONTAJE
Lento en la apertura, acelera levemente en el medio, cierra estático.

COLOR
Tonos tierra. Desaturar los neutros (barra, taza), mantener el café cálido. Sin filtros de Instagram. Que se vea elaborado, no filtrado.

AUDIO
Sonido ambiente del proceso + música instrumental minimalista (sin letra). El goteo debe escucharse.`,
  },

  {
    id: 'mes2-v02-matcha',
    title: 'Video: El matcha',
    type: 'video' as const,
    pilar: 'La Barra' as const,
    objective: 'Posicionamiento' as const,
    status: 'idea' as const,
    date: '2026-06-09',
    link: '',
    comments: [],
    concept: `OBJETIVO
Capturar a quien no va a Varietal por café. El matcha es el gancho de sorpresa — diferencia a la barra de cualquier cafetería genérica.

FORMATO
Reel vertical · 20–30 seg (puede ser más corto, el color lo sostiene)

ESTRUCTURA DE PLANOS
1. El polvo de matcha en el bowl — macro, el verde debe dominar el encuadre
2. El batido: movimiento circular del chasen — plano detalle, enfoque en la espuma
3. El matcha terminado en taza — plano cenital o 3/4, superficie lisa y brillante
4. La taza sobre la barra junto a otra taza de café — contrapunto visual: verde vs. café

TEXTO EN PANTALLA
"No viniste por el café. Está bien."
Cierre: nombre del lugar

COPY DE PUBLICACIÓN (caption)
No todo el mundo viene por el café.

El matcha tiene su propio ritual. Nosotros lo respetamos.

Varietal — [dirección]`,
    visual: `MONTAJE
Fluido, sin cortes abruptos. Este video respira más que el de filtrados.

COLOR
El verde del matcha es el protagonista. No lo apagues con la corrección. Todo lo demás puede estar frío o neutro — que el matcha contraste.

AUDIO
Sin música con letra. Algo ambiental suave o solo sonido del lugar. El batido debe escucharse.`,
  },

  {
    id: 'mes2-v03-espresso-cortado',
    title: 'Video: Espresso + cortado',
    type: 'video' as const,
    pilar: 'La Barra' as const,
    objective: 'Posicionamiento' as const,
    status: 'idea' as const,
    date: '2026-06-16',
    link: '',
    comments: [],
    concept: `OBJETIVO
El café más accesible del menú. Este video habla con quien no quiere complicarse — solo un buen café rápido.

FORMATO
Reel vertical · 20–30 seg, ritmo más rápido que los anteriores

ESTRUCTURA DE PLANOS
1. La palanca bajando o el botón del espresso — plano detalle
2. El chorro del espresso en taza pequeña — macro, el crema visible
3. La leche cayendo en el cortado — lento si es posible, la mezcla de colores
4. La taza terminada sobre la barra — plano limpio, sin manos

TEXTO EN PANTALLA
"El café que no necesita explicación."

COPY DE PUBLICACIÓN (caption)
Hay cafés que no necesitan presentación.

Espresso o cortado. Los dos en Varietal.
📍 [dirección]`,
    visual: `MONTAJE
El más dinámico de los 4 videos. Cortes más rápidos, pero sin caer en ritmo de TikTok acelerado. Que se sienta ágil, no ansioso.

COLOR
Más contraste que los anteriores. El espresso puede tener más calidez, los blancos más limpios.

AUDIO
Puede tener un beat más marcado que el matcha — algo que acompañe el ritmo del montaje sin ser comercial.`,
  },

  {
    id: 'mes2-v04-cafe-del-dia',
    title: 'Video: Café del día (formato recurrente)',
    type: 'video' as const,
    pilar: 'La Tostaduría' as const,
    objective: 'Educación' as const,
    status: 'idea' as const,
    date: '2026-06-23',
    link: '',
    comments: [],
    concept: `OBJETIVO
Generar visitas recurrentes. Este es el único video que se repite cada mes con pequeñas variaciones — lo que cambia es el café, no el formato.

FORMATO
Reel o Story vertical · 20–30 seg

ESTRUCTURA FIJA (se repite cada vez)
1. Plano del empaque o etiqueta del café de esa semana — nombre del origen visible
2. El café molido en el portafiltro — macro
3. Barista (sin cara necesaria, puede ser solo manos y torso) preparando
4. Taza terminada + texto con las notas de sabor

TEXTO EN PANTALLA (estructura fija)
CAFÉ DEL DÍA
[País de origen]
Notas: [sabor 1], [sabor 2], [sabor 3]
Disponible esta semana.

COPY DE PUBLICACIÓN (caption — copy fijo, cambia solo el origen)
Esta semana: [nombre del café], [país de origen].

Notas de [sabor 1], [sabor 2] y [sabor 3].

Disponible mientras dure. Después entra el siguiente.
📍 [dirección]`,
    visual: `MONTAJE
Estructura fija que se repite cada mes. Lo que cambia es el café, no el formato.

COLOR
Consistente con la identidad visual de Varietal — tono cálido, limpio.

AUDIO
Sonido ambiente del proceso.`,
  },

  // ════════════════════════════════════════════════════════════
  // CARRUSELES
  // ════════════════════════════════════════════════════════════

  {
    id: 'mes2-c01-como-se-hace-filtrado',
    title: 'Carrusel: Cómo se hace un filtrado',
    type: 'photo' as const,
    pilar: 'La Tostaduría' as const,
    objective: 'Educación' as const,
    status: 'idea' as const,
    date: '2026-06-02',
    link: '',
    comments: [],
    concept: `OBJETIVO
Educación + credibilidad. El espectador que no sabe qué es un filtrado termina queriendo probar uno.

FORMATO
6–8 slides · Semana 1

ESTRUCTURA DE SLIDES
1. Cover — Plano del filtrado en proceso, agua cayendo.
   Copy: "No es café de máquina."

2. El molido — Macro del café recién molido en el dosificador.
   Copy: "Todo empieza con el grano correcto."

3. El bloom — El primer chorro de agua sobre el café.
   Copy: "30 segundos de espera. El café libera sus gases. Se llama bloom."

4. El goteo — Plano del chorro cayendo a la taza.
   Copy: "El agua hace el trabajo. Solo necesita tiempo."

5. El resultado — La taza terminada, limpia, sin adornos.
   Copy: "Sin leche. Sin azúcar. Solo el café."

6. Cierre — Las 3 tazas en fila.
   Copy: "Tres orígenes disponibles hoy. Ven a elegir el tuyo."

COPY DE PUBLICACIÓN (caption)
El filtrado no es complicado. Solo tiene sus tiempos.

Agua, temperatura, paciencia. El resultado habla solo.

Tres orígenes disponibles en Varietal esta semana.
📍 [dirección]`,
    visual: `FOTOGRAFÍA
Luz natural o difusa. Sin flash. Fondo neutro o la barra de Varietal. Cada slide debe poder leerse sola — no son una secuencia obligatoria.

TIPOGRAFÍA EN SLIDES
Sans-serif limpia. Texto chico, no centrado necesariamente. Que respire.`,
  },

  {
    id: 'mes2-c02-matcha-angulos',
    title: 'Carrusel: El matcha desde todos los ángulos',
    type: 'photo' as const,
    pilar: 'La Barra' as const,
    objective: 'Posicionamiento' as const,
    status: 'idea' as const,
    date: '2026-06-10',
    link: '',
    comments: [],
    concept: `OBJETIVO
No es educativo. Es visual. Que el matcha se vea tan bueno que alguien lo guarde o lo mande a un amigo.

FORMATO
6 slides — producto hero puro · Semana 2

ESTRUCTURA DE SLIDES
1. Cover — El matcha terminado en taza, cenital. Verde saturado.
   Copy: "Matcha." (o sin texto)

2. El polvo — Macro del polvo de matcha en cuchara o bowl. Textura visible.
   Copy: —

3. El batido — El chasen en movimiento, levemente borroso. La espuma formándose.
   Copy: —

4. El color — Plano 3/4 de la taza, la superficie refleja la luz. El verde como protagonista absoluto.
   Copy: —

5. El contraste — La taza de matcha junto a una de café. Sin texto. La imagen habla.
   Copy: —

6. Cierre — La taza en manos.
   Copy: "Disponible en Varietal."

COPY DE PUBLICACIÓN (caption)
Verde. Espumoso. Nada que explicar.

Matcha disponible en Varietal.
📍 [dirección]`,
    visual: `FOTOGRAFÍA
El color lo es todo. No subexponer. Que el verde del matcha no se vea gris. Si la luz del local no alcanza, este carrusel justifica una sesión en un momento específico del día donde entra mejor luz.

NOTA CLAVE
Sin copy educativo en este carrusel. No explicar qué es el matcha. Que la imagen genere la pregunta.`,
  },

  {
    id: 'mes2-c03-cortado-o-filtrado',
    title: 'Carrusel: ¿Cortado o filtrado?',
    type: 'photo' as const,
    pilar: 'La Barra' as const,
    objective: 'Comunidad' as const,
    status: 'idea' as const,
    date: '2026-06-12',
    link: '',
    comments: [],
    concept: `OBJETIVO
Generar comentarios y guardados. Este carrusel no vende directamente — construye comunidad y algoritmo.

FORMATO
4–5 slides — conversacional · Semana 2

ESTRUCTURA DE SLIDES
1. Cover — Las dos tazas, una al lado de la otra.
   Copy: "¿Cortado o filtrado?"

2. El cortado — Solo esa taza.
   Copy: "Si tienes 5 minutos y necesitas que algo funcione."

3. El filtrado — Solo esa taza.
   Copy: "Si tienes 15 minutos y quieres que algo se sienta bien."

4. El remate — Plano de ambas sobre la barra.
   Copy: "Depende del día. Los dos están aquí."

5. CTA
   Copy: "¿Cuál eres tú hoy? Cuéntanos en los comentarios."

COPY DE PUBLICACIÓN (caption)
Desliza y elige.

Ninguno está mal. Solo depende del momento.

¿Cuál eres tú hoy?

(Sin dirección en este. Que la conversación fluya primero.)`,
    visual: `FOTOGRAFÍA
Limpia y consistente con el resto del feed.

TONO DE COPY
El copy de este carrusel no debe sonar a marca. Debe sonar a alguien que conoce el café y habla sin pretensión. Nada de "¡Explora nuestros sabores!"`,
  },

  {
    id: 'mes2-c04-tres-filtrados-texturas',
    title: 'Carrusel: Los 3 filtrados — texturas y colores',
    type: 'photo' as const,
    pilar: 'La Tostaduría' as const,
    objective: 'Educación' as const,
    status: 'idea' as const,
    date: '2026-06-17',
    link: '',
    comments: [],
    concept: `OBJETIVO
Mostrar que los filtrados no son todos iguales. Despertar curiosidad por el origen.

FORMATO
6 slides — producto hero · Semana 3

ESTRUCTURA DE SLIDES
1. Cover — Las 3 tazas en fila, cenital.
   Copy: "Tres. Elige uno."

2. Filtrado 1 — La taza sola + nombre del origen y una nota de sabor.
   Copy: "Etiopía — floral, cítrico."

3. Filtrado 2 — La taza sola.
   Copy: "Colombia — caramelo, almendra."

4. Filtrado 3 — La taza sola.
   Copy: "Guatemala — chocolate, nuez."

5. El proceso unificado — Un plano del goteo, sin especificar cuál.
   Copy: "El proceso es el mismo. El resultado, no."

6. Cierre
   Copy: "Disponibles esta semana. Si se acaba un origen, entra el siguiente."
   (Esto genera urgencia real sin fabricarla.)

COPY DE PUBLICACIÓN (caption)
Etiopía, Colombia, Guatemala.

Cada uno llega con su carácter. Cuando se termina un origen, entra el siguiente.

Ven antes de que cambie.
📍 [dirección]`,
    visual: `FOTOGRAFÍA
Que las 3 tazas sean visualmente distintas si es posible — diferente loza, diferente nivel de líquido, diferente ángulo de luz. Si son idénticas, el mensaje de "son diferentes" no convence.`,
  },

  {
    id: 'mes2-c05-el-lugar',
    title: 'Carrusel: El lugar',
    type: 'photo' as const,
    pilar: 'La Barra' as const,
    objective: 'Comunidad' as const,
    status: 'idea' as const,
    date: '2026-06-19',
    link: '',
    comments: [],
    concept: `OBJETIVO
Que alguien que nunca fue a Varietal entienda qué se siente estar ahí. Sin personas, sin producto. Solo el espacio.

FORMATO
5–7 slides — ambiente · Semana 3

ESTRUCTURA DE SLIDES
1. Cover — El plano más editorial del local. La barra vacía, la luz entrando, un detalle arquitectónico.
   Copy: —

2. Detalle 1 — Algo que nadie nota si no va: una grieta estética, la textura de la barra, el handle de una taza.
   Copy: —

3. Detalle 2 — La luz a cierta hora del día. Si hay una hora donde el local se ve especialmente bien, ese es el momento de esta foto.
   Copy: —

4. Detalle 3 — Un objeto del espacio que tenga carácter: una planta, un objeto en la barra, el empaque de un café.
   Copy: —

5. Cierre — Plano general o semigeneral del local vacío.
   Copy: Horarios y dirección, limpio.

COPY DE PUBLICACIÓN (caption)
Un espacio para quedarse un rato o pasar rápido.

Los dos están bien.

Varietal — [dirección] — [horarios]`,
    visual: `FOTOGRAFÍA
Este es el carrusel más difícil de ejecutar bien. El riesgo es que se vea como foto de bienes raíces. Cerezo debe buscar el ángulo que hace que el espacio se vea vivido, no exhibido. Luz natural siempre que sea posible.`,
  },

  {
    id: 'mes2-c06-espresso-grano-taza',
    title: 'Carrusel: El espresso — del grano a la taza',
    type: 'photo' as const,
    pilar: 'La Tostaduría' as const,
    objective: 'Educación' as const,
    status: 'idea' as const,
    date: '2026-06-24',
    link: '',
    comments: [],
    concept: `OBJETIVO
Mismo formato que el carrusel de filtrados pero para el espresso. Credibilidad técnica + accesibilidad.

FORMATO
5–6 slides — proceso · Semana 4

ESTRUCTURA DE SLIDES
1. Cover — El espresso en taza, el crema visible.
   Copy: "Dos minutos. Sin apuro."

2. El grano — Los granos antes del molido. Macro.
   Copy: —

3. El dosificado — El café en el portafiltro, antes de prensar.
   Copy: —

4. El prensado — La mano sobre el tamper. Plano detalle.
   Copy: —

5. La extracción — El chorro del espresso cayendo. Macro si es posible.
   Copy: —

6. La taza — Plano final, limpio.
   Copy: "Café de Varietal." + dirección.

COPY DE PUBLICACIÓN (caption)
Dos minutos desde el grano hasta la taza.

Sin prisa. Sin máquina de cápsulas.

Espresso en Varietal.
📍 [dirección]`,
    visual: `FOTOGRAFÍA
Consistente con el carrusel de filtrados — misma paleta, misma limpieza.

TIPOGRAFÍA EN SLIDES
Sans-serif limpia. Solo los hitos del proceso llevan copy.`,
  },

  {
    id: 'mes2-c07-que-hay-esta-semana',
    title: 'Carrusel: Qué hay esta semana',
    type: 'photo' as const,
    pilar: 'La Barra' as const,
    objective: 'Posicionamiento' as const,
    status: 'idea' as const,
    date: '2026-06-26',
    link: '',
    comments: [],
    concept: `OBJETIVO
Cierre del mes. Convertir atención en visita.

FORMATO
4 slides — acción directa · Semana 4

ESTRUCTURA DE SLIDES
1. Cover — Foto limpia de producto.
   Copy: "Esta semana en Varietal."

2. El café del día — Nombre del origen, notas de sabor. Misma identidad visual que el video recurrente.
   Copy: —

3. El menú resumido — Los 3 filtrados, espresso, cortado, matcha.
   Copy: Sin precios si no quieren, o con precios si ya están listos para eso.

4. Cierre — Dirección, horarios, días de apertura.
   Copy: "Te esperamos."

COPY DE PUBLICACIÓN (caption)
Esta semana en Varietal:

☕ Café del día: [origen]
☕ Los 3 filtrados disponibles
🍵 Matcha
☕ Espresso y cortado

[Horarios]. Te esperamos.
📍 [dirección]`,
    visual: `FOTOGRAFÍA
Este carrusel es el más funcional del mes. No tiene que ser el más lindo — tiene que ser el más claro.

NOTA
Jerarquía visual evidente en cada slide.`,
  },

  {
    id: 'mes2-c08-experiencia-sabores',
    title: 'Carrusel: Experiencia de Sabores — Varietal',
    type: 'photo' as const,
    pilar: 'La Barra' as const,
    objective: 'Comunidad' as const,
    status: 'idea' as const,
    date: '2026-06-07',
    link: '',
    comments: [],
    concept: `OBJETIVO
Generar reservas para la Experiencia de Sabores los sábados — 2 horarios por día.
Canal de reserva: DM / WhatsApp [número].

FORMATO
Carrusel Instagram · 6 slides

CONTEXTO DE SESIÓN
Una sola sesión de producción. Las 5 piezas de la experiencia se fotografían juntas y por separado.

ESTRUCTURA DE SLIDES
1. Cover — Las 5 piezas dispuestas sobre la barra en composición limpia.
   Foto: Dos tazas de filtrado, una de espresso, la bebida con leche y la muestra pequeña.
   Texto superpuesto: "Experiencia de sabores — Varietal"

2. Los filtrados — Las dos tazas de filtrado juntas.
   Texto: "Dos filtrados. Dos orígenes. Aprendes a distinguirlos."

3. El espresso — La taza de espresso sola.
   Texto: "Un espresso. La base de todo lo que hacemos."

4. La bebida con leche — El cortado o bebida con leche.
   Texto: "La leche no es relleno. Te mostramos por qué nuestros cortados son más dulces."

5. La muestra — La taza pequeña de muestra.
   Texto: "El café que más te gustó, para llevarte puesto."

6. Cierre — Las 5 piezas o plano del espacio.
   Texto:
   Todos los sábados.
   Dos horarios. [X] lugares por sesión.
   Reserva por DM.

COPY DE PUBLICACIÓN (caption)
Cinco momentos para entender el café desde adentro.

Dos filtrados de origen, un espresso, una bebida con leche preparada con técnica propia y una muestra del café que más te gustó.

No necesitas saber nada de café para venir. Eso es exactamente el punto.

Todos los sábados — dos horarios disponibles.
Reserva por DM o escríbenos al [número].`,
    visual: `BRIEF DE FOTOGRAFÍA — CEREZO

PLANO GENERAL (slide 1 — cover)
Las 5 piezas dispuestas sobre la barra en composición limpia: dos tazas de filtrado, una de espresso, la bebida con leche y la muestra pequeña. Luz natural o difusa. Sin props adicionales. Plano cenital o ligeramente inclinado. Que todo quepa sin que se vea amontonado.

PLANOS INDIVIDUALES (slides 2 al 5)
Cada pieza fotografiada sola. Misma lógica de luz y fondo en todas para que el carrusel tenga coherencia visual. Planos 3/4 o cenitales según la pieza — lo que muestre mejor el líquido y la textura.

· Filtrados: el líquido y su transparencia son el argumento. Buscar la luz que los haga brillar.
· Espresso: el crema visible es obligatorio. Foto inmediatamente después de extraer.
· Bebida con leche: que se vea la textura del steamed milk. Si hay latte art, que sea limpio y simple.
· Muestra: taza pequeña, íntima. Puede tener la mano sosteniéndola.

COLOR
Tonos tierra, cálidos pero no saturados. Coherente con el resto del feed.

LO QUE NO HACER
✗ No mezclar lozas de estilos muy distintos entre slides
✗ No fondos con objetos decorativos que distraigan
✗ No filtros que aplanen el café`,
  },

];

// Strip the string `id` from each post — Supabase will generate a proper UUID.
// We use `title` for deduplication so re-running the seed is safe.
const MES2_TITLES = MES2_POSTS.map(p => p.title);

export const seedMes2 = async (): Promise<{ inserted: number; skipped: number }> => {
  let inserted = 0;
  let skipped = 0;

  // Fetch all existing titles in one query
  const { data: existing } = await supabase
    .from('posts')
    .select('title')
    .in('title', MES2_TITLES);

  const existingTitles = new Set((existing ?? []).map((r: { title: string }) => r.title));

  for (const { id: _id, ...post } of MES2_POSTS) {
    if (existingTitles.has(post.title)) {
      skipped++;
      continue;
    }

    const { error } = await supabase.from('posts').insert(post);
    if (!error) {
      inserted++;
    } else {
      console.error(`Error inserting "${post.title}":`, error.message);
    }
  }

  return { inserted, skipped };
};
