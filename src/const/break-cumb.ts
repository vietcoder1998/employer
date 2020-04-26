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
    CONNECTED: '/connected',
    UNCONNECT: '/unconnect',
    REJECTED: '/rejected',
    ACCEPTED: '/accepted',

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
    COMMUNITY: '/community',
    GUIDE: '/guide',
    ANNOU_DEFAULT: '/annou-default',
    PRIVACY: '/privacy',
    FEED_BACK: '/feed-back',
    PROMOTION: '/promotion',
    EVENT: '/event',
    SCHOOLS: '/schools'
};

export const routeLink = {
    // Job
    PENDING_JOBS: routePath.ADMIN + routePath.JOBS + routePath.PENDING_JOBS,
    EM_BRANCHES: routePath.ADMIN + routePath.JOBS + routePath.EM_BRANCHES,
    FIND_CANDIDATES: routePath.ADMIN + routePath.JOBS + routePath.FIND_CANDIDATES,
    SAVE_CANDIDATE: routePath.ADMIN + routePath.JOBS + routePath.SAVE_CANDIDATE,
    JOB_ANNOUNCEMENTS: routePath.ADMIN + routePath.JOBS + routePath.JOB_ANNOUNCEMENTS,
    ADMIN_ACCOUNTS: routePath.ADMIN + routePath.PROFILE + routePath.ADMIN_ACCOUNT,
    // Connect School
    CONNECT_SCHOOLS: routePath.ADMIN + routePath.CONNECT_SCHOOLS,
    CONNECTED_SCHOOLS: routePath.ADMIN + routePath.CONNECT_SCHOOLS + routePath.CONNECTED,
    UNCONNECT_SCHOOLS: routePath.ADMIN + routePath.CONNECT_SCHOOLS + routePath.UNCONNECT,
    PENDING_SCHOOLS: routePath.ADMIN + routePath.CONNECT_SCHOOLS + routePath.PENDING,
    EVENT: routePath.ADMIN + routePath.CONNECT_SCHOOLS + routePath.EVENT,
    // User controller
    USER_CONTROLLER: routePath.ADMIN + routePath.USER_CONTROLLER,
    // Notification
    NOTI: routePath.ADMIN + routePath.NOTI,
    // Convernient
    JOB_SERVICE: routePath.ADMIN + routePath.CONVERNIENT + routePath.JOB_SERVICE,
    PROMOTION: routePath.ADMIN + routePath.CONVERNIENT + routePath.PROMOTION,
    // More info
    COMMUNITY: routePath.ADMIN + routePath.MORE_INFO + routePath.COMMUNITY,
    GUIDE: routePath.ADMIN + routePath.MORE_INFO + routePath.GUIDE,
    ANNOU_DEFAULT: routePath.ADMIN + routePath.MORE_INFO + routePath.ANNOU_DEFAULT,
    PRIVACY: routePath.ADMIN + routePath.MORE_INFO + routePath.PRIVACY,
    FEED_BACK: routePath.ADMIN + routePath.MORE_INFO + routePath.FEED_BACK,
    // Announcement
    ANNOUNCEMENT: routePath.ANNOUNCEMENT,
};

export const breakCumb = [
    // Dèault
    { label: "jobs", name: "Tuyển dụng", icon: null, url: "/jobs", disable: true },
    { label: "create", name: "Tạo mới", icon: null, url: "/create", disable: true },
    { label: "detail", name: "Chi tiết", icon: null, url: "/detail", disable: true },
    { label: "list", name: "Danh sách", icon: null, url: "/list", disable: true },
    { label: "fix", name: "Chỉnh sửa", icon: null, url: "/fix", disable: true },
    { label: "apply", name: "Ứng tuyển", icon: null, url: "/apply", disable: true },
    { label: "convernient", name: "Tiện ích dịch vụ", icon: null, url: "/convernient", disable: true },
    { label: "more-info", name: "Thông tin khác", icon: null, url: "/more-info", disable: true },
    { label: "connected", name: "Đã gửi lời mời", icon: null, url: "/more-info", disable: true },
    { label: "unconnect", name: "Chưa gửi lời mời", icon: null, url: "/unconnect", disable: true },
    { label: "pending", name: "Đang chờ", icon: null, url: "/pending", disable: true },
    // Jobs
    { label: "announcements", name: "Bài viết", icon: null, url: routeLink.ANNOUNCEMENT + routePath.LIST },
    { label: "job-announcements", name: "Quản lý bài đăng", icon: null, url: routeLink.JOB_ANNOUNCEMENTS + routePath.LIST },
    { label: "em-branches", name: "Quản lý chi nhánh", icon: "loading", url: routeLink.EM_BRANCHES + routePath.LIST },
    { label: "find-candidates", name: "Hồ sơ ứng viên", icon: null, url: routeLink.FIND_CANDIDATES + routePath.LIST },
    { label: "saved-candidate", name: "Hồ sơ ứng viên đã lưu", icon: null, url: routeLink.SAVE_CANDIDATE + routePath.LIST },
    { label: "pending-jobs", name: "Bài đăng đang chờ", icon: null, url: routeLink.PENDING_JOBS + routePath.LIST },
    // Connect School
    { label: "connect-schools", name: "Kết nối trường học", icon: null, url: routeLink.CONNECT_SCHOOLS + routePath.LIST },
    { label: "event", name: "Sự kiện", icon: null, url: routeLink.EVENT + routePath.LIST },
    // School 
    { label: "admin-account", name: "Hồ sơ nhà tuyển dụng", icon: null, url: routeLink.ADMIN_ACCOUNTS + routePath.LIST },
    { label: "user-controller", name: "Quản lý tài khoản", icon: null, url: routeLink.USER_CONTROLLER + routePath.LIST },
    // Notification
    { label: "noti", name: "Thông báo", icon: null, url: routeLink.NOTI + routePath.LIST },
    // Convernient service
    { label: "job-service", name: "Chi tiết gói", icon: null, url: routeLink.JOB_SERVICE },
    { label: "promotion", name: "Khuyến mãi", icon: null, url: routeLink.PROMOTION },
    //More-Info
    { label: "community", name: "App Mobile", icon: null, url: routeLink.COMMUNITY },
    { label: "guide", name: "Hướng dẫn sử dụng ", icon: null, url: routeLink.GUIDE },
    { label: "feed-back", name: "Phản hồi", icon: null, url: routeLink.FEED_BACK },
    { label: "privacy", name: "Điều khoản sử dụng", icon: null, url: routeLink.PRIVACY },
    { label: "annou-default", name: "Bài viết", icon: null, url: routeLink.ANNOU_DEFAULT },
]