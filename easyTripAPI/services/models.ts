export interface Attraction{
    id: number
    attraction_image_id: number
    city_id: number
    name: string
    description: string
    location: string
    telephone: string
    url:string
}

export interface ScheduleItem{
    id: number
    trip_id: number
    attraction_id:number
    name?: string
    description?: string
    start_time?: string
    end_time?: string
    location?: string
    type: string
}