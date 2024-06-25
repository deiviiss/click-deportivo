'use server'

import { revalidatePath } from 'next/cache'
import cloudinary from '@/libs/cloudinary'
import prisma from '@/libs/prisma'

export const uploadPhoto = async (
  formData: FormData) => {
  try {
    const data = Object.fromEntries(formData)
    let images

    if (formData.getAll('images')) {
      images = await uploadImages(formData.getAll('images') as File[])

      if (!images) {
        throw new Error('Error al subir las imagenes')
      }

      images.map(async (image) => {
        await prisma.photo.create({
          data: {
            url: image || '',
            photographerId: data.photographer as string,
            disciplineId: data.discipline as string,
            eventId: data.event as string,
            stateId: data.state as string,
            venueId: data.venue as string,
            ramaId: data.rama as string,
            categoryId: data.category as string
          }
        })
      })
    }

    revalidatePath('/show-photos')

    return {
      ok: true,
      message: 'Imagenes cargadas correctamente'
    }
  } catch (error) {
    // eslint-disable-next-line
    console.log(error)
    return {
      ok: false,
      message: 'Error al cargar las imagenes'
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPomises = images.map(async (image: File) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        return await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'click-deportivo' }).then(r => r.secure_url)
      } catch (error) {
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPomises)

    return uploadedImages
  } catch (error) {
    return null
  }
}
