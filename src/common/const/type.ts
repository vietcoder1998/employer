export const TYPE = {
    SUCCESS: 'success',
    ERROR: "error",
    WARNING: "warning",

    PENDING: "PENDING",
    REJECTED: "REJECTED",
    ACCEPTED: "ACCEPTED",

    PARTTIME: "PARTTIME",
    FULLTIME: "FULLTIME",
    INTERNSHIP: "INTERNSHIP",

    CANDIDATE: "CANDIDATE",
    EMPLOYER: "EMPLOYER",
    SCHOOL: "SCHOOL",
    PUBLIC: "PUBLIC",
    STUDENT: "STUDENT",

    ALL: "ALL",
    CREATE: "CREATE",
    EDIT: "EDIT",
    INPUT: "INPUT",
    SELECT: "SELECT",
    DELETE: "DELETE",
    ACTIVE: "ACTIVE",
    UN_ACTIVE: "UN_ACTIVE",

    HIDDEN: "HIDDEN",
    SHOW: "SHOW",

    EXPIRED: "EXPIRED",
    UN_EXPRIED: "UN_EXPRIED",

    EXIST: "EXIST",
    NON_EXIST: "NON_EXIST",

    JOB_FILTER: {
        expired: 'expired',
        hidden: 'hidden',
        jobType: 'jobType',
        homePriority: 'homePriority',
        homeExpired: 'homeExpired',
        searchPriority: 'searchPriority',
        searchExpired: 'searchExpired',
        excludedJobIDs: 'excludedJobIDs',
        jobNameIDs: 'jobNameIDs',
        jobGroupIDs: 'jobGroupIDs',
        hasPendingApplied: 'hasPendingApplied',
        hasAcceptedApplied: 'hasAcceptedApplied',
        hasRejectedApplied: 'hasRejectedApplied',
        jobShiftFilter: 'jobShiftFilter',
        jobLocationFilter: 'jobLocationFilter'
    },

    EM_BRANCHES: {
        headquarters: 'headquarters',
        regionID: 'regionID'
      }
}