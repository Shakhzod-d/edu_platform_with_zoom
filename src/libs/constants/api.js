export const API = {
  LOGIN: '/api/user/login',
  REGISTER: '/api/user/client/register',
  CLIENT_LOGIN: '/api/user/client/login',
  SEND_EMAIL: '/api/user/send-emile-code',
  CHEK_CODE: '/api/user/chek-code',
  CHANGE_PASSWORD: '/api/user/change-password',
  ME: '/api/user/me',
  USER: '/api/user',
  TUTOR: '/api/user/tutor',
  STUDENT: '/api/user/student',
  CHAT: '/api/user/Chat',
  RESET_PASSWORD: '/api/user/password',
  ACCOUNT: '/api/user/account',
  BECOME_TUTOR: '/api/user/become-tutor',
  SUCCESS_TUTOR: '/api/user/success/tutor',
  DASHBOARD: '/api/user/dashboard',
  TUTOR_ID: '/api/user/tutor/:tutorId',
  USER_PLAN: '/api/user-plan',
  SUBSCRIPTION: '/api/subscription-plan',
  REPORT: '/api/report',
  REPORT_ID: '/api/report/:id',
  REPORT_TEACHER_ID: '/api/report/teacher/:teacherId',
  RATING: '/api/rating',
  RATING_ID: '/api/rating/:tutorId',
  LIBRARY: '/api/library',
  LIBRARY_ID: '/api/library/:id',

  // EVENTS

  EVENT: '/api/event/respond',
  TEACHER_LIST: '/api/user/success/tutor?page=1&limit=10',
  SLOTS_LIST: `/api/event/tutor`,
  LESSON_DURATION_WEEK: `/api/lesson-duration-week`,
  SUBSCRIPTION_PLAN: `/api/subscription-plan`,
  USER_ME: `/api/user/me`,
}
