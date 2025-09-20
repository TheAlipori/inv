import { defineCollection, z } from 'astro:content';

const xvCollection = defineCollection({
  type: 'data', // Para archivos YAML/JSON
  schema: z.object({
    // Información básica
    tipo_evento: z.string(),
    tema: z.string(),
    color_primario: z.string(),
    color_secundario: z.string(),
    colorBackground: z.string().optional(),
    colorAdornos: z.string().optional(),
    colorTexto: z.string().optional(),
    mostrarGaleria: z.boolean().optional(),
    titulo: z.string(),
    descripcion: z.string(),

    // Quinceañera
    quinceanera: z.object({
      nombre: z.string(),
    }),

    // Familiares
    familiares: z.object({
      padre: z.string().optional(),
      madre: z.string().optional(),
      padrino: z.string().optional(),
      madrina: z.string().optional(),
    }),

    // Fecha
    fecha: z.object({
      dia: z.string(),
      mes: z.string(),
      anio: z.string(),
      fecha_iso: z.string(),
    }),

    // Imágenes
    imagenes: z.object({
      portada: z.string(),
      icon: z.string(),
      flowers: z.string(),
      galeria1: z.string(),
      galeria2: z.string(),
      galeria3: z.string(),
      galeria4: z.string(),
      galeria5: z.string(),
      galeria6: z.string().optional(),
      galeria7: z.string().optional(),
    }),

    // Eventos
    misa: z.object({
      lugar: z.string(),
      direccion: z.string(),
      maps: z.string(),
      hora: z.string(),
    }),

    recepcion: z.object({
      lugar: z.string(),
      direccion: z.string(),
      maps: z.string(),
      hora: z.string(),
    }),

    // Contacto
    whatsapp: z.string(),
    
    // Google Photos
    google_fotos: z.string().optional(),
  }),
});

const bodaCollection = defineCollection({
  type: 'data', // Para archivos YAML/JSON
  schema: z.object({
    // Información básica
    tipo_evento: z.string(),
    tema: z.string(),
    color_primario: z.string(),
    color_secundario: z.string(),
    color_terciario: z.string().optional(),
    colorBackground: z.string().optional(),
    colorAdornos: z.string().optional(),
    colorTexto: z.string().optional(),
    mostrarGaleria: z.boolean().optional(),
    titulo: z.string(),
    descripcion: z.string(),

    // Novios
    novios: z.object({
      novia: z.string(),
      novio: z.string(),
    }),

    // Padrinos
    padrinos: z.object({
      padrino: z.string(),
      madrina: z.string(),
    }),

    // Fecha
    fecha: z.object({
      dia: z.string(),
      mes: z.string(),
      anio: z.string(),
      fecha_iso: z.string(),
    }),

    // Imágenes
    imagenes: z.object({
      portada: z.string(),
      icon: z.string(),
      flowers: z.string(),
      galeria1: z.string(),
      galeria2: z.string(),
      galeria3: z.string(),
      galeria4: z.string(),
      galeria5: z.string(),
      galeria6: z.string().optional(),
      galeria7: z.string().optional(),
    }),

    // Eventos
    ceremonia: z.object({
      lugar: z.string(),
      direccion: z.string(),
      maps: z.string(),
      hora: z.string(),
    }),

    recepcion: z.object({
      lugar: z.string(),
      direccion: z.string(),
      maps: z.string(),
      hora: z.string(),
    }),

    // Música
    musica: z.object({
      cancion: z.string(),
      artista: z.string(),
    }).optional(),

    // Contacto
    whatsapp: z.string(),
  }),
});

export const collections = {
  xv: xvCollection,
  boda: bodaCollection,
};