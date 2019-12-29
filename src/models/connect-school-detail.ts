export interface IConnectSchoolDetail {
    id?: string,
    requestMessage?: string,
    name?: string,
    replyMessage?: string,
    shortName?: string,
    logoUrl?: string,
    coverUrl?: string,
    schoolType?: {
      id?: number,
      name?: string,
      priority?: number
    },
    region?: {
      id?: number,
      name?: string
    },
    address?: string,
    lat?: number,
    lon?: number,
    owner?: "EMPLOYER",
    state?: string,
    createdDate?: number,
    replyDate?: number,
    lastModified?: number
}