import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/libs/constants/routes'
import { Layout } from '@/layouts'
import {
  Chat,
  Student,
  StudentHelp,
  StudentLive,
  StudentTutors,
  StudentCourses,
  StudentSchedule,
  StudentSettings,
  StudentFeedback,
  StudentUpcoming,
  StudentCompleted,
  StudentDashboard,
  StudentFavorites,
  StudentSubscriptions,
  TutorDetails,
} from '@/router/lazy'
import { StudentCalendar } from '@/pages/Student/Calendar'
import { CreateRoom } from '@/pages/Tutor/CreateRoom'
import { Room } from '@/pages/Tutor/CreateRoom/Room'

export const studentRoutes = (isAuth) => [
  {
    path: ROUTES.student,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Student />,
      },
      {
        path: ROUTES.tutors,
        element: <StudentTutors />,
      },
      {
        path: ROUTES.courses,
        element: <StudentCourses />,
      },
      {
        path: ROUTES.settings,
        element: <StudentSettings />,
      },
      {
        path: ROUTES.subscriptions,
        element: <StudentSubscriptions />,
      },
      {
        path: ROUTES.favorites,
        element: <StudentFavorites />,
      },
      {
        path: ROUTES.help,
        element: <StudentHelp />,
      },
      {
        path: ROUTES.feedback,
        element: <StudentFeedback />,
      },
      {
        path: ROUTES.chat,
        element: <Chat />,
      },
      {
        path: ROUTES.calendar,
        element: <StudentCalendar />,
      },
      {
        path: ROUTES.createRoom,
        element: <CreateRoom />,
      },
      {
        path: ROUTES.room,
        element: <Room />,
      },

      {
        path: `${ROUTES.student}/${ROUTES.dashboard}`,
        element: <StudentDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to={`${ROUTES.student}/${ROUTES.dashboard}/${ROUTES.upcoming}`} />,
          },
          {
            path: ROUTES.upcoming,
            element: <StudentUpcoming />,
          },
          {
            path: ROUTES.live,
            element: <StudentLive />,
          },
          {
            path: ROUTES.schedule,
            element: <StudentSchedule />,
          },
          {
            path: ROUTES.completed,
            element: <StudentCompleted />,
          },
        ],
      },
    ],
  },
]
