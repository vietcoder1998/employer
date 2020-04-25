export interface IConnectSchool {
    id?: string,
    name?: string,
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

export interface IConnectSchools {
    pageIndex?: number,
    pageSize?: number,
    totalItems?: number,
    items?: Array<IConnectSchool>
}

export interface IConnectSchoolsFilter {
    name?: string,
    shortName?: string,
    regionID?: number,
    schoolTypeID?: number,
    jobNameIDs?: Array<number>,
    hasRequest?: boolean,
    owner?: string,
    state?: string
}