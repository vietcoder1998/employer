export const REDUX = {
    AUTHEN: {
        FAIL_AUTHEN: "FAIL_AUTHEN",
        EXACT_AUTHEN: "EXACT_AUTHEN",
    },
    HANDLE_MODAL: "HANDLE_MODAL",
    HANDLE_DRAWER: "HANDLE_DRAWER",
    PENDING_JOBS: {
        GET_PENDING_JOBS: "GET_PENDING_JOBS",
    },
    PENDING_JOB_DETAIL: {
        GET_PENDING_JOB_DETAIL: "GET_PENDING_JOB_DETAIL",
    },
    ADMIN_ACCOUNT: {
        GET_ADMIN_ACCOUNT: "GET_ADMIN_ACCOUNT"
    },
    JOB_NAMES: {
        GET_JOB_NAMES: "GET_JOB_NAMES",
        GET_SINGLE_JOB_NAME: "GET_SINGLE_JOB_NAME"
    },
    TYPE_MANAGEMENT: {
        GET_TYPE_MANAGEMENT: "GET_TYPE_MANAGEMENT",
    },
    JOB_ANNOUNCEMENTS: {
        GET_JOB_ANNOUNCEMENTS: "GET_JOB_ANNOUNCEMENTS"
    },
    TYPE_SCHOOLS: {
        GET_TYPE_SCHOOLS: "GET_TYPE_SCHOOLS",
    },
    LANGUAGES: {
        GET_LANGUAGES: "GET_LANGUAGES"
    },
    REGIONS: {
        GET_REGIONS: "GET_REGIONS"
    },
    SKILLS: {
        GET_SKILLS: "GET_SKILLS"
    },
    MAJORS: {
        GET_MAJORS: "GET_MAJORS"
    },
    JOB_GROUPS: {
        GET_JOB_GROUPS: "GET_JOB_GROUPS"
    },
    BRANCHES: {
        GET_BRANCHES: "GET_BRANCHES"
    },
    EM_BRANCHES: {
        GET_EM_BRANCHES: "GET_EM_BRANCHES"
    },
    ANNOU_COMMENTS: {
        GET_ANNOU_COMMENTS: "GET_ANNOU_COMMENTS",
        GET_ANNOU_COMMENT_DETAIL: "GET_ANNOU_COMMENT_DETAIL"
    },
    ANNOU_TYPES: {
        GET_ANNOU_TYPES: "GET_ANNOU_TYPES",
    },
    ANNOUNCEMENTS: {
        GET_ANNOUNCEMENTS: "GET_ANNOUNCEMENTS"
    },
    ANNOUNCEMENT_DETAIL: {
        GET_ANNOUNCEMENT_DETAIL: "GET_ANNOUNCEMENT_DETAIL"
    },
    JOB_ANNOUNCEMENT_DETAIL: {
        GET_JOB_ANNOUNCEMENT_DETAIL: "GET_JOB_ANNOUNCEMENT_DETAIL"
    },
    FIND_CANDIDATES: {
        GET_FIND_CANDIDATES: "GET_FIND_CANDIDATES"
    },
    FIND_CANDIDATE_DETAIL: {
        GET_FIND_CANDIDATE_DETAIL: "GET_FIND_CANDIDATE_DETAIL"
    },
    SAVED_CANDIDATE_PROFILES: {
        GET_SAVED_CANDIDATE_PROFILES: "GET_SAVED_CANDIDATE_PROFILES"
    },
    SAVED_CANDIDATE_PROFILE_DETAIL: {
        GET_SAVED_CANDIDATE_PROFILE_DETAIL: "GET_SAVED_CANDIDATE_PROFILE_DETAIL"
    },
    JOB_SERVICE: {
        GET_JOB_SERVICE: "GET_JOB_SERVICE"
    },
    MAP: {
        SET_MAP_STATE: "SET_MAP_STATE"
    },
    CONNECT_SCHOOL: {
        GET_CONNECT_SCHOOL: "GET_CONNECT_SCHOOLS",
        GET_CONNECT_SCHOOL_DETAIL: "GET_CONNECT_SCHOOLS_DETAIL",
        GET_SCHOOL_DETAIL: "GET_SCHOOL_DETAIL",
        GET_SCHOOL_BRANCHES: "GET_SCHOOL_BRANCHES"
    },
    APPLY_JOB: {
        GET_APPLY_JOB: "GET_APPLY_JOB"
    },
    NOTI: {
        GET_NOTI: "GET_NOTI",
        GET_NOTI_DETAIL: "GET_NOTI_DETAIL"
    },
    LIST_RATE: {
        GET_LIST_RATE: "GET_LIST_RATE"
    },
    RATING_USER: {
        GET_RATING_USER: "GET_RATING_USER"
    },
    JOB_SUITABLE_CANDIDATE: {
        GET_JOB_SUITABLE_CANDIDATE: "JOB_SUITABLE_CANDIDATE",
        LOADING_JOB_SUITABLE_CANDIDATE: "LOADING_JOB_SUITABLE_CANDIDATE"
    },
    EVENT_SCHOOLS: {
        GET_LIST_EVENT_SCHOOLS: "GET_LIST_EVENT_SCHOOLS",
        GET_LIST_EVENT_JOBS: "GET_LIST_EVENT_JOBS",
        GET_EVENT_DETAIL: "GET_EVENT_DETAIL",
        GET_EVENT_JOB_DETAIL: "GET_EVENT_JOB_DETAIL",
        GET_EVENT_JOB_SERVICE: "GET_EVE,NT_JOB_SERVICE"
    },
    PARNER: {
        GET_PARTNER_DETAIL: "GET_PARTNER_DETAIL"
    }
};

export const REDUX_SAGA = {
    ADMIN_ACCOUNT: {
        GET_ADMIN_ACCOUNT: "GET_ADMIN_ACCOUNT_DATA"
    },
    PENDING_JOBS: {
        GET_PENDING_JOBS: "GET_PENDING_JOBS_DATA",
    },
    PENDING_JOB_DETAIL: {
        GET_PENDING_JOB_DETAIL: "GET_PENDING_JOB_DETAIL_DATA",
    },
    JOB_NAMES: {
        GET_JOB_NAMES: "GET_JOB_NAMES_DATA",
    },
    TYPE_MANAGEMENT: {
        GET_TYPE_MANAGEMENT: "GET_TYPE_MANAGEMENT_DATA",
    },
    TYPE_SCHOOLS: {
        GET_TYPE_SCHOOLS: "GET_TYPE_SCHOOLS_DATA",

    },
    LANGUAGES: {
        GET_LANGUAGES: "GET_LANGUAGES_DATA"
    },
    REGIONS: {
        GET_REGIONS: "GET_REGIONS_DATA"
    },
    SKILLS: {
        GET_SKILLS: "GET_SKILLS_DATA"
    },
    MAJORS: {
        GET_MAJORS: "GET_MAJORS_DATA"
    },
    JOB_GROUPS: {
        GET_JOB_GROUPS: "GET_JOB_GROUPS_DATA"
    },
    BRANCHES: {
        GET_BRANCHES: "GET_BRANCHES_DATA"
    },
    JOB_ANNOUNCEMENTS: {
        GET_JOB_ANNOUNCEMENTS: "GET_JOB_ANNOUNCEMENTS_DATA"
    },
    EM_BRANCHES: {
        GET_EM_BRANCHES: "GET_EM_BRANCHES_DATA"
    },
    ANNOU_TYPES: {
        GET_ANNOU_TYPES: "GET_ANNOU_TYPES_DATA",
    },
    ANNOU_COMMENTS: {
        GET_ANNOU_COMMENTS: "GET_ANNOU_COMMENTS_DATA",
        GET_ANNOU_COMMENT_DETAIL: "GET_ANNOU_COMMENT_DETAIL_DATA",
        DELETE_ANNOU_COMMENT: "DELETE_ANNOU_COMMENT"
    },
    ANNOUNCEMENTS: {
        GET_ANNOUNCEMENTS: "GET_ANNOUNCEMENTS_DATA"
    },
    ANNOUNCEMENT_DETAIL: {
        GET_ANNOUNCEMENT_DETAIL: "GET_ANNOUNCEMENT_DETAIL_DATA"
    },
    FIND_CANDIDATES: {
        GET_FIND_CANDIDATES: "GET_FIND_CANDIDATES_DATA"
    },
    FIND_CANDIDATE_DETAIL: {
        GET_FIND_CANDIDATE_DETAIL: "GET_FIND_CANDIDATE_DETAIL_DATA"
    },
    SAVED_CANDIDATE_PROFILES: {
        GET_SAVED_CANDIDATE_PROFILES: "GET_SAVED_CANDIDATE_PROFILES_DATA"
    },
    SAVED_CANDIDATE_PROFILE_DETAIL: {
        GET_SAVED_CANDIDATE_PROFILE_DETAIL: "GET_SAVED_CANDIDATE_PROFILE_DETAIL_DATA"
    },
    JOB_ANNOUNCEMENT_DETAIL: {
        GET_JOB_ANNOUNCEMENT_DETAIL: "GET_JOB_ANNOUNCEMENT_DETAIL_DATA"
    },
    JOB_SERVICE: {
        GET_JOB_SERVICE: "GET_JOB_SERVICE_DATA"
    },
    CONNECT_SCHOOL: {
        GET_CONNECT_SCHOOL: "GET_CONNECT_SCHOOLS_DATA",
        GET_CONNECT_SCHOOL_DETAIL: "GET_CONNECT_SCHOOLS_DETAIL_DATA",
        GET_SCHOOL_DETAIL: "GET_SCHOOL_DETAIL_DATA",
        GET_SCHOOL_BRANCHES: "GET_SCHOOL_BRANCHES_DATA"
    },
    APPLY_JOB: {
        GET_APPLY_JOB: "GET_APPLY_JOB_DATA"
    },
    NOTI: {
        GET_NOTI: "GET_NOTI_DATA",
        GET_NOTI_DETAIL: "GET_NOTI_DETAIL_DATA"
    },
    LIST_RATE: {
        GET_LIST_RATE: "GET_LIST_RATE_DATA"
    },
    RATING_USER: {
        GET_RATING_USER: "GET_RATING_USER_DATA"
    },
    JOB_SUITABLE_CANDIDATE: {
        GET_JOB_SUITABLE_CANDIDATE: "GET_JOB_SUITABLE_CANDIDATE_DATA",
    },
    EVENT_SCHOOLS: {
        GET_LIST_EVENT_SCHOOLS: "GET_LIST_EVENT_SCHOOLS_DATA",
        GET_LIST_EVENT_JOBS: "GET_LIST_EVENT_JOBS_DATA",
        GET_EVENT_DETAIL: "GET_EVENT_DETAIL_DATA",
        GET_EVENT_JOB_DETAIL: "GET_EVENT_JOB_DETAIL_DATA",
        GET_EVENT_JOB_SERVICE: "GET_EVENT_JOB_SERVICE_DATA"
    }
}