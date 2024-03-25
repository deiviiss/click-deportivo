import { type Category, type State, type Event, type Photo, type Photographer } from '@prisma/client'

export interface PhotoShow extends Photo {
  photographer: Photographer
  event: Event
  category: Category
  state: State
}
