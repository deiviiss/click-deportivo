'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import cloudinary from '@/libs/cloudinary'
import prisma from '@/libs/prisma'

export const uploadPhoto = async (
  prevState: string | undefined,
  formData: FormData) => {
  try {
    const image = formData.get('img')

    if (!image || typeof image !== 'string') {
      return 'No se guardo la imagen, carga la imagen.'
    }

    // convert the base64 encoded image to a Buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // saved img to cloudinary
    const result: { secure_url: string } = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'click-deportivo' }, (err, result) => {
        if (err) {
          reject(err)
        }

        if (result) {
          resolve({ secure_url: result.secure_url })
        }
      }).end(buffer)
    })

    // get the url of the image
    const imageUrl = result.secure_url

    // save the image to the database
    await prisma.photo.create({
      data: {
        url: imageUrl,
        eventId: formData.get('eventId') as string,
        photographerId: formData.get('photographerId') as string,
        categoryId: formData.get('categoryId') as string,
        stateId: formData.get('stateId') as string,
        numberPlayer: Number(formData.get('numberPlayer'))
      }
    })
  } catch (error) {
    return 'ErrorUploadingImage'
  }

  revalidatePath('/show-photos')
  redirect('/show-photos')
}
