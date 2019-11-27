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
    },

    FIND_CANDIDATES_FILTER: {
        gender: 'gender',
        birthYearStart: 'birthYearStart',
        birthYearEnd: 'birthYearEnd',
        regionID: 'regionID',
        lookingForJob: 'lookingForJob',
        profileVerified: 'profileVerified',
        completeProfile: 'completeProfile',
        jobNameIDs: 'jobNameIDs',
        skillIDs: 'skillIDs',
        languageIDs: "languageIDs",
        unlocked: "",
        ids: "ids",
    },

    ANNONCEMENT_BODY: {
        jobTitle: 'jobTitle',
        jobNameID: 'jobNameID',
        employerBranchID: 'employerBranchID',
        description: 'description',
        requiredSkillIDs: 'requiredSkillIDs',
        jobType: 'jobType',
        expirationDate: 'expirationDate',
        shifts: 'shifts'
    },

    TRUE: "TRUE",
    FALSE: "FALSE",

    MALE: "MALE",
    FEMALE: "FEMALE"
}