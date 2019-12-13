export const routePath = {
    ADMIN: `/v1/admin`,
    LIST: '/list',
    JOBS: '/jobs',
    ACCOUNT: '/account',
    CREATE: '/create',
    COPY: '/copy',
    FIX: '/fix',
    DETAIL: '/detail',
    APPLY: '/apply',
    PENDING: '/pending',
    PROFILE: '/profile',
    CONVERNIENT: '/convernient',

    EM_BRANCHES: '/em-branches',
    SAVE_CANDIDATE: '/saved-candidate',
    FIND_CANDIDATES: '/find-candidates',
    JOB_ANNOUNCEMENTS: '/job-announcements',
    ANNOUNCEMENT: '/announcements',
    CONNECT_SCHOOLS: '/connect-schools',
    MORE_INFO: '/more-info',
    ADMIN_ACCOUNT: '/admin-account',
    NOTI: '/noti',
    USER_CONTROLLER: '/user-controller',
    PENDING_JOBS: '/pending-jobs',
    JOB_SERVICE: '/job-service',
};

export const routeLink = {
    EM_BRANCHES: routePath.ADMIN + routePath.JOBS + routePath.EM_BRANCHES,
    FIND_CANDIDATES: routePath.ADMIN + routePath.JOBS + routePath.FIND_CANDIDATES,
    SAVE_CANDIDATE: routePath.ADMIN + routePath.JOBS + routePath.SAVE_CANDIDATE,
    JOB_ANNOUNCEMENTS: routePath.ADMIN + routePath.JOBS + routePath.JOB_ANNOUNCEMENTS,
    ANNOUNCEMENT: routePath.ANNOUNCEMENT,
    CONNECT_SCHOOLS: routePath.ADMIN + routePath.CONNECT_SCHOOLS,
    ADMIN_ACCOUNTS: routePath.ADMIN + routePath.PROFILE + routePath.ADMIN_ACCOUNT,
    NOTI: routePath.ADMIN + routePath.NOTI,
    USER_CONTROLLER: routePath.ADMIN + routePath.USER_CONTROLLER ,
    PENDING_JOBS: routePath.ADMIN + routePath.JOBS + routePath.PENDING_JOBS ,
    JOB_SERVICE: routePath.ADMIN + routePath.CONVERNIENT  + routePath.JOB_SERVICE 
};

export const breakCumb = [
    { label: "jobs", name: "Tuyển dụng", icon: null, url: "/jobs", disable: true },
    { label: "create", name: "Tạo mới", icon: null, url: "/create", disable: true },
    { label: "detail", name: "Chi tiết", icon: null, url: "/detail", disable: true },
    { label: "list", name: "Danh sách", icon: null, url: "/list", disable: true },
    { label: "fix", name: "Chỉnh sửa", icon: null, url: "/fix", disable: true },
    { label: "apply", name: "Ứng tuyển", icon: null, url: "/apply", disable: true },
    { label: "convernient", name: "Tiện ích", icon: null, url: "/convernient", disable: true },

    { label: "announcements", name: "Bài viết", icon: null, url: routeLink.ANNOUNCEMENT + routePath.LIST },
    { label: "job-announcements", name: "Quản lí bài đăng", icon: null, url: routeLink.JOB_ANNOUNCEMENTS + routePath.LIST },
    { label: "em-branches", name: "Quản lí chi nhánh", icon: "loading", url: routeLink.EM_BRANCHES + routePath.LIST },
    { label: "find-candidates", name: "Hồ sơ ứng viên", icon: null, url: routeLink.FIND_CANDIDATES + routePath.LIST },
    { label: "saved-candidate", name: "Hồ sơ ứng viên đã lưu", icon: null, url: routeLink.SAVE_CANDIDATE + routePath.LIST },
    { label: "connect-schools", name: "Kết nối trường học", icon: null, url: routeLink.CONNECT_SCHOOLS + routePath.LIST },
    { label: "admin-account", name: "Hồ sơ nhà tuyển dụng", icon: null, url: routeLink.ADMIN_ACCOUNTS + routePath.LIST },
    { label: "noti", name: "Thông báo", icon: null, url: routeLink.NOTI + routePath.LIST },
    { label: "pending-jobs", name: "Bài đăng đang chờ", icon: null, url: routeLink.PENDING_JOBS + routePath.LIST },
    { label: "user-controller", name: "Thông báo", icon: null, url: routeLink.USER_CONTROLLER + routePath.LIST },
    { label: "job-service", name: "Gói dịch vụ", icon: null, url: routeLink.JOB_SERVICE },

]