import { defineCollection, z } from 'astro:content';

const xvCollection = defineCollection({
  type: 'data', // Para archivos YAML/JSON
  schema: z.object({
    // Información básica
    tipo_evento: z.string(),
    tema: z.string(),
    color_primario: z.string(),
    color_secundario: z.string(),
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
  }),
});

export const collections = {
  xv: xvCollection,
};