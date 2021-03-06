export const TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',

    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
    ACCEPTED: 'ACCEPTED',
    CONNECTED: 'CONNECTED',
    UNCONNECTED: 'UNCONNECTED',
    SEND_RQ: 'SEND_RQ',
    RECEIVE_RQ: 'RECEIVE_RQ',

    PARTTIME: 'PARTTIME',
    FULLTIME: 'FULLTIME',
    INTERNSHIP: 'INTERNSHIP',

    CANDIDATE: 'CANDIDATE',
    EMPLOYER: 'EMPLOYER',
    SCHOOL: 'SCHOOL',
    PUBLIC: 'PUBLIC',
    STUDENT: 'STUDENT',
    TITLE_HIGHLIGHT: 'TITLE_HIGHLIGHT',

    ALL: 'ALL',
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    FIX: 'FIX',
    INPUT: 'INPUT',
    COPY: 'COPY',
    SELECT: 'SELECT',
    DELETE: 'DELETE',
    BAN: 'BAN',
    ACTIVE: 'ACTIVE',
    UN_ACTIVE: 'UN_ACTIVE',
    LIST: 'LIST',
    VIEW: 'VIEW',
    SAVE: 'SAVE',
    UNLOCK: 'UNLOCK',
    RATING: 'RATING',

    HIDDEN: 'HIDDEN',
    SHOW: 'SHOW',

    EXPIRED: 'EXPIRED',
    UN_EXPRIED: 'UN_EXPRIED',

    EXIST: 'EXIST',
    NON_EXIST: 'NON_EXIST',

    OPEN: 'OPEN',
    CLOSE: 'CLOSE',
    HANDLE: 'HANDLE',

    HIGHLIGHT: 'HIGHLIGHT',
    IN_DAY: 'IN_DAY',
    TOP: 'TOP',

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
        jobLocationFilter: 'jobLocationFilter',
        highlightExpired:'highlightExpired',
        highlight: 'highlight',
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
        languageIDs: 'languageIDs',
        workingToolIDs: 'workingToolIDs',
        unlocked: 'unlocked',
        ids: 'ids',
        profileType: 'profileType'
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

    TRUE: 'TRUE',
    FALSE: 'FALSE',

    MALE: 'MALE',
    FEMALE: 'FEMALE',
    BOTH: 'BOTH',

    NOTI: {
        REPLY_JOB_OFFER_REQUEST: 'REPLY_JOB_OFFER_REQUEST',
        REPLY_JOB_APPLY_REQUEST: 'REPLY_JOB_APPLY_REQUEST',
        REPLY_PENDING_JOB: 'REPLY_PENDING_JOB',
        REPLY_CONNECT_REQUEST: 'REPLY_CONNECT_REQUEST',
        RATED: 'RATED',
        JOB_OFFER_REQUEST: "JOB_OFFER_REQUEST",
        UPDATE_SYSTEM_ANNOUNCEMENT: 'UPDATE_SYSTEM_ANNOUNCEMENT',
        JOB_APPLY_REQUEST: "JOB_APPLY_REQUEST"
    },

    CONNECT_SCHOOL: {
        name: 'name',
        shortName: 'shortName',
        regionID: 'regionID',
        schoolTypeID: 'schoolTypeID',
        jobNameIDs: 'jobNameIDs',
        hasRequest: 'hasRequest',
        owner: 'owner',
        state: 'state'
    }
}