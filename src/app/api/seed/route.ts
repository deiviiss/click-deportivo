import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import cloudinary from '@/libs/cloudinary'
import prisma from '@/libs/prisma'

export async function GET() {
  // DELETE ALL data
  await prisma.user.deleteMany()
  await prisma.photo.deleteMany()
  await prisma.event.deleteMany()
  await prisma.photographer.deleteMany()

  // clean cloudinary
  await cloudinary.api.delete_resources_by_prefix('click-deportivo')

  // create test users
  await prisma.user.createMany({
    data: [
      {
        id: '218da11a-3790-4040-b1f0-d5e6de9d5250',
        email: 'admin@mail.com',
        name: 'Administrador',
        password: bcrypt.hashSync('admin123'),
        roles: 'admin'
      },
      {
        id: '618c01ea-fc81-4ac3-a6b3-bf07d87e607e',
        email: 'user1@mail.com',
        name: 'Usuario 1',
        password: bcrypt.hashSync('user01')
      }
    ]
  }
  )

  // create test photographers
  await prisma.photographer.createMany({
    data: [
      {
        id: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        name: 'John Doe',
        email: 'photographer1@mail.com',
        phone: '9811685678'
      },
      {
        id: 'd1f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        name: 'Juan Perez',
        email: 'photographer2@mail.com',
        phone: '9811685678'
      }
    ]
  })

  // create events
  await prisma.event.createMany({
    data: [
      {
        id: '83e625e2-e932-4d26-9afe-c99979a40a24',
        name: 'Peleas Semifinales Karate',
        date: new Date(),
        location: 'Coliseo Amauta',
        description: 'Un emocionante torneo que presenta a los mejores luchadores de karate en la ronda de semifinales. Ven y siente la pasión y el espíritu competitivo.'
      },
      {
        id: '959dc135-4b76-4cd1-b008-9186ec06f381',
        name: 'Peleas Finales Luchas',
        date: new Date(),
        location: 'Estadio Nacional',
        description: 'La gran final de lucha llega al Estadio Nacional, donde se coronará al campeón de esta temporada. No te pierdas la acción.'
      },
      {
        id: 'f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        name: 'Soccer',
        date: new Date(),
        location: 'Coliseo Fragata',
        description: 'Disfruta de un partido lleno de energía y talento, donde los equipos luchan por la victoria. Una experiencia imperdible para los fans del fútbol.'
      }
    ]
  })

  //
  await prisma.photo.createMany({
    data: [
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/lucha_1.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: '959dc135-4b76-4cd1-b008-9186ec06f381'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/lucha_2',
        photographerId: 'd1f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        eventId: '959dc135-4b76-4cd1-b008-9186ec06f381'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/karate_1.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: '83e625e2-e932-4d26-9afe-c99979a40a24'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/karate_2.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: '83e625e2-e932-4d26-9afe-c99979a40a24'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/soccer_1.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: 'f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/soccer_2.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: 'f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b'
      }
    ]
  })

  revalidatePath('/')
  redirect('/')
}
