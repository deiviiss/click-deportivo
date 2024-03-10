import { type Photo, type Photographer } from '@prisma/client'

export interface PhotoWithPhotographer extends Photo {
  photographer: Photographer
}