export type NullableDate = Date | null

export type Place = {
  id: number
  place: string
  startDate: NullableDate
  endDate: NullableDate
}

export type Plan = {
  name: string
  startDate: NullableDate
  endDate: NullableDate
  headCount: number
  places: Place[]
}
