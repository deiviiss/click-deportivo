import { type State, type Event, type Photo, type Photographer, type Discipline } from '@prisma/client'

export interface PhotoShow extends Photo {
  photographer: Photographer
  event: Event
  discipline: Discipline
  state: State
}
