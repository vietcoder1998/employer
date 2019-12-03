export const routePath = {
    ADMIN: `/v1/admin`,
    LIST: '/list',
    JOBS: '/jobs',
    CREATE: '/create',
    COPY: '/copy',
    FIX: '/fix',
    DETAIL: '/detail',
    APPLY: '/apply',

    EM_BRANCHES: '/em-branches',
    SAVE_CANDIDATE: '/save-candidate-profiles/',
    FIND_CANDIDATES: '/find-candidates',
    JOB_ANNOUNCEMENTS: '/job-announcements',
    ANNOUNCEMENT: '/announcements',
    CONNECT_SCHOOLS: '/connect-schools',
};

export const routeLink = {
    EM_BRANCHES: routePath.ADMIN + routePath.JOBS + routePath.EM_BRANCHES,
    FIND_CANDIDATES: routePath.ADMIN + routePath.JOBS + routePath.FIND_CANDIDATES,
    SAVE_CANDIDATE: routePath.ADMIN + routePath.JOBS + routePath.SAVE_CANDIDATE,
    JOB_ANNOUNCEMENTS: routePath.ADMIN + routePath.JOBS + routePath.JOB_ANNOUNCEMENTS,
    ANNOUNCEMENT: routePath.ADMIN + routePath.JOBS + routePath.ANNOUNCEMENT,
    CONNECT_SCHOOLS: routePath.ADMIN + routePath.CONNECT_SCHOOLS,
};

export const breakCumb = [
    { label: "jobs", name: "Tuyển dụng", icon: null, url: "/jobs", disable: true },
    { label: "create", name: "Tạo mới", icon: null, url: "/create", disable: true },
    { label: "detail", name: "Chi tiết", icon: null, url: "/detail", disable: true },
    { label: "list", name: "Danh sách", icon: null, url: "/list", disable: true },
    { label: "fix", name: "Chỉnh sửa", icon: null, url: "/fix", disable: true },
    { label: "apply", name: "Ứng tuyển", icon: null, url: "/apply", disable: true },

    { label: "announcements", name: "Bài viết", icon: null, url: routeLink.ANNOUNCEMENT + routePath.LIST  },
    { label: "job-announcements", name: "Quản lí bài đăng", icon: null, url: routeLink.JOB_ANNOUNCEMENTS + routePath.LIST },
    { label: "em-branches", name: "Quản lí chi nhánh", icon: "loading", url: routeLink.EM_BRANCHES + routePath.LIST },
    { label: "find-candidates", name: "Hồ sơ ứng viên", icon: null, url: routeLink.FIND_CANDIDATES + routePath.LIST },
    { label: "saved-candidate", name: "Hồ sơ ứng viên đã lưu", icon: null, url: routeLink.SAVE_CANDIDATE + routePath.LIST },
    { label: "connect-schools", name: "Hồ sơ ứng viên đã lưu", icon: null, url: routeLink.CONNECT_SCHOOLS + routePath.LIST }
]