import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import cloudinary from '@/libs/cloudinary'
import prisma from '@/libs/prisma'

export async function GET() {
  // DELETE ALL data
  await prisma.photo.deleteMany()
  await prisma.event.deleteMany()
  await prisma.rama.deleteMany()
  await prisma.state.deleteMany()
  await prisma.venue.deleteMany()
  await prisma.category.deleteMany()
  await prisma.discipline.deleteMany()
  await prisma.photographer.deleteMany()
  await prisma.user.deleteMany()

  // clean cloudinary
  await cloudinary.api.delete_resources_by_prefix('click-deportivo')

  // create test users
  await prisma.user.createMany({
    data: [
      {
        id: '218da11a-3790-4040-b1f0-d5e6de9d5250',
        email: 'admin@mail.com',
        name: 'Administrador',
        password: bcrypt.hashSync('userseed'),
        roles: 'admin'
      },
      {
        id: '618c01ea-fc81-4ac3-a6b3-bf07d87e607e',
        email: 'user1@mail.com',
        name: 'Usuario 1',
        password: bcrypt.hashSync('userseed')
      }
    ]
  }
  )

  // create test photographers
  await prisma.photographer.createMany({
    data: [
      {
        id: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        name: 'Diego Avila',
        email: 'photographer1@mail.com',
        phone: '9811685678'
      },
      {
        id: 'd1f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        name: 'David Hilera',
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
        name: 'Clasificatorios',
        date: new Date(),
        location: 'Coliseo Amauta',
        description: 'Un emocionante torneo que presenta a los mejores luchadores de karate en la ronda de semifinales. Ven y siente la pasión y el espíritu competitivo.'
      },
      {
        id: '959dc135-4b76-4cd1-b008-9186ec06f381',
        name: 'Semifinal',
        date: new Date(),
        location: 'Estadio Nacional',
        description: 'La gran final de lucha llega al Estadio Nacional, donde se coronará al campeón de esta temporada. No te pierdas la acción.'
      },
      {
        id: 'f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        name: 'Final',
        date: new Date(),
        location: 'Coliseo Fragata',
        description: 'Disfruta de un partido lleno de energía y talento, donde los equipos luchan por la victoria. Una experiencia imperdible para los fans del fútbol.'
      }
    ]
  })

  // create categories
  await prisma.category.createMany({
    data: [
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2a',
        name: 'Infantil menor'
      },
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2q',
        name: 'Infantil mayor'
      },
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2w',
        name: 'Juvenil menor'
      },
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2e',
        name: 'Juvenil mayor'
      },
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2r',
        name: 'Juvenil superior'
      }
    ]
  })

  // create diciplines
  await prisma.discipline.createMany({
    data: [
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2a',
        name: 'Voleibol'
      },
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2q',
        name: 'Ajedrez'
      },
      {
        id: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2w',
        name: 'Breaking'
      }
    ]
  })

  // create rama
  await prisma.rama.createMany({
    data: [
      {
        id: 'c5b0d1d0-4d3f-899c-8f6c-7a7f9f4f3c2q',
        name: 'Varonil'
      },
      {
        id: 'c5b0d1d0-4d3f-hj9c-8f6c-7a7f9f4f3c2w',
        name: 'Femenil'
      }
    ]
  })

  // create states
  await prisma.state.createMany({
    data: [
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c26',
        name: 'Baja California',
        code: 'BC'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c27',
        name: 'Guanajuato',
        code: 'Gto'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c28',
        name: 'Hidalgo',
        code: 'Hgo'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c29',
        name: 'Quintana Roo',
        code: 'QRoo'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c30',
        name: 'San Luis Potosí',
        code: 'SLP'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c31',
        name: 'Tabasco',
        code: 'Tab'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c32',
        name: 'UNAM',
        code: 'UNAM'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c15',
        name: 'Aguascalientes',
        code: 'Ags'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c14',
        name: 'Baja California Sur',
        code: 'BCS'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c13',
        name: 'Campeche',
        code: 'Camp'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c25',
        name: 'Chihuahua',
        code: 'Chih'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c12',
        name: 'Ciudad de México',
        code: 'CDMX'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c24',
        name: 'Colima',
        code: 'Col'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c11',
        name: 'Estado de México',
        code: 'EdoMex'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c22',
        name: 'Guerrero',
        code: 'Gro'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c10',
        name: 'Jalisco',
        code: 'Jal'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c20',
        name: 'Michoacán',
        code: 'Mich'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c19',
        name: 'Nayarit',
        code: 'Nay'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c17',
        name: 'Nuevo León',
        code: 'NL'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3e23',
        name: 'Oaxaca',
        code: 'Oax'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3e18',
        name: 'Puebla',
        code: 'Pue'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c21',
        name: 'Sinaloa',
        code: 'Sin'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3s16',
        name: 'Tamaulipas',
        code: 'Tam'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3q21',
        name: 'Veracruz',
        code: 'Ver'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3w22',
        name: 'Yucatán',
        code: 'Yuc'
      }
    ]

  })

  // create venues
  await prisma.venue.createMany({
    data: [
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c12',
        name: 'CEDAR',
        location: 'Aguascalientes',
        description: 'Un lugar mítico donde se han celebrado las más grandes competencias de lucha en la ciudad.'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c13',
        name: '20 de Noviembre',
        location: 'Baja California',
        description: 'El estadio más grande de la ciudad, donde se han celebrado los eventos más importantes de lucha.'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c14',
        name: 'Centro de convenciones',
        location: 'Baja California Sur',
        description: 'Un lugar emblemático donde se han celebrado los partidos más emocionantes de fútbol.'
      },
      {
        id: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c15',
        name: 'Playa Bonita',
        location: 'Baja California Sur',
        description: 'Un lugar emblemático donde se han celebrado los partidos más emocionantes de fútbol.'
      }
    ]
  })

  // create photos
  await prisma.photo.createMany({
    data: [
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/lucha_1.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: '959dc135-4b76-4cd1-b008-9186ec06f381',
        stateId: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c12',
        disciplineId: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2a'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/lucha_2',
        photographerId: 'd1f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        eventId: '959dc135-4b76-4cd1-b008-9186ec06f381',
        stateId: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c13',
        disciplineId: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2q'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/karate_1.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: '83e625e2-e932-4d26-9afe-c99979a40a24',
        stateId: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c14',
        disciplineId: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2w'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/karate_2.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: '83e625e2-e932-4d26-9afe-c99979a40a24',
        stateId: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c12',
        disciplineId: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2a'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/soccer_1.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: 'f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        stateId: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c13',
        disciplineId: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2q'
      },
      {
        url: 'https://res.cloudinary.com/api-post-img/image/upload/v1710333597/seeds/click-deportivo/soccer_2.jpg',
        photographerId: '26d0a232-63c5-4cd4-a388-a047580e95f7',
        eventId: 'f1b0d0-4d3f-4f9c-8f6c-7a7f9f4f3c1b',
        stateId: 'd5b0d2e0-4d3f-4f9c-8f6c-7a7f9f4f3c14',
        disciplineId: 'c5b0d1d0-4d3f-4f9c-8f6c-7a7f9f4f3c2w'
      }
    ]
  })

  await prisma.photo.deleteMany()

  return NextResponse.json({ message: 'Executed seeded' })
}
