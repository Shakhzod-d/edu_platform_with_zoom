import { Navigate } from 'react-router-dom'
import { ROUTES } from '@/libs/constants/routes'
import { Layout } from '@/layouts'
import {
  StudentCourses,
  Tutor,
  TutorDashboard,
  TutorDetails,
  TutorHistory,
  TutorIncoming,
  TutorLibrary,
  TutorPriority,
  TutorUnassigned,
  TutorUpcoming,
  TutorReservation,
} from '@/router/lazy'

export const tutorRoutes = (isAuth) => [
  {
    path: ROUTES.tutor,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Tutor />,
      },
      {
        path: ROUTES.priority,
        element: <TutorPriority />,
      },
      {
        path: ROUTES.library,
        element: <TutorLibrary />,
      },
      {
        path: ROUTES.history,
        element: <TutorHistory />,
      },
      {
        path: ROUTES.priority,
        element: <TutorPriority />,
      },
      {
        path: ROUTES.reservation,
        element: <TutorReservation />,
      },
      {
        path: ROUTES.tutorId,
        element: <TutorDetails />,
      },
      {
        path: `${ROUTES.tutor}/${ROUTES.dashboard}`,
        element: <TutorDashboard />,
        children: [
          {
            index: true,
            element: <Navigate to={`${ROUTES.tutor}/${ROUTES.dashboard}/${ROUTES.incoming}`} />,
          },
          {
            path: ROUTES.incoming,
            element: <TutorIncoming />,
          },
          {
            path: ROUTES.upcoming,
            element: <TutorUpcoming />,
          },
          {
            path: ROUTES.unassigned,
            element: <TutorUnassigned />,
          },
        ],
      },
    ],
  },
]
