import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/libs/prisma'

export async function GET() {
  // DELETE ALL data
  await prisma.user.deleteMany()
  await prisma.photo.deleteMany()
  await prisma.photographer.deleteMany()

  // Create test users
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

  revalidatePath('/')
  redirect('/')
}
