export interface PersonalData {
  name: string
  surname: string
  documentId: number
}

export interface ResponsePersonalData{
  message:string
  personal:PersonalData
}
