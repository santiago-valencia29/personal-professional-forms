export interface ProfessionalData {
  company: string
  startDate: Date
  endDate: Date
}

export interface ResponseProfessionalData {
  message:string
  professional:ProfessionalData
}
