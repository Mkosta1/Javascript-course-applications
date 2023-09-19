export interface ITrainingData { 
    id: string,
    name: string,
    since: Date | null,
    until: Date | null,
    duration: number,
    locationId: string,
    excerciseId: string,
}