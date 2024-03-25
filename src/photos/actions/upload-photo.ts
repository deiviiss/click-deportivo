'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import cloudinary from '@/libs/cloudinary'
import prisma from '@/libs/prisma'

export const uploadPhoto = async (
  prevState: string | undefined,
  formData: FormData) => {
  try {
    // Assume that the field name in the FormData was updated to img0, img1, ...
    let index = 0
    let image
    const imagesUrls = []

    // itera about each image received
    while ((image = formData.get(`img${index}`)) && typeof image === 'string') {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      // upload img to cloudinary
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

      // save the url of the image uploaded
      imagesUrls.push(result.secure_url)
      index++
    }

    // save every image to the database
    for (const imageUrl of imagesUrls) {
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
    }
  } catch (error) {
    return 'ErrorUploadingImage'
  }

  revalidatePath('/show-photos')
  redirect('/show-photos')
}
