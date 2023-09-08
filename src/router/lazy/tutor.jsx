import { lazy } from 'react'
import { handleCatchChunkError } from '../utils'

export const Tutor = lazy(() =>
  import('@/pages')
    .then(({ Tutor }) => ({ default: Tutor }))
    .catch(handleCatchChunkError)
)

export const TutorRegister = lazy(() =>
  import('@/pages')
    .then(({ TutorRegister }) => ({ default: TutorRegister }))
    .catch(handleCatchChunkError)
)

export const TutorHistory = lazy(() =>
  import('@/pages')
    .then(({ TutorHistory }) => ({ default: TutorHistory }))
    .catch(handleCatchChunkError)
)

export const TutorDetails = lazy(() =>
  import('@/pages')
    .then(({ TutorDetails }) => ({ default: TutorDetails }))
    .catch(handleCatchChunkError)
)

export const TutorLibrary = lazy(() =>
  import('@/pages')
    .then(({ TutorLibrary }) => ({ default: TutorLibrary }))
    .catch(handleCatchChunkError)
)

export const TutorDashboard = lazy(() =>
  import('@/pages')
    .then(({ TutorDashboard }) => ({ default: TutorDashboard }))
    .catch(handleCatchChunkError)
)

export const TutorIncoming = lazy(() =>
  import('@/pages')
    .then(({ TutorIncoming }) => ({ default: TutorIncoming }))
    .catch(handleCatchChunkError)
)
export const TutorUnassigned = lazy(() =>
  import('@/pages')
    .then(({ TutorUnassigned }) => ({ default: TutorUnassigned }))
    .catch(handleCatchChunkError)
)
export const TutorUpcoming = lazy(() =>
  import('@/pages')
    .then(({ TutorUpcoming }) => ({ default: TutorUpcoming }))
    .catch(handleCatchChunkError)
)

export const TutorPriority = lazy(() =>
  import('@/pages')
    .then(({ TutorPriority }) => ({ default: TutorPriority }))
    .catch(handleCatchChunkError)
)

export const TutorReservation = lazy(() =>
  import('@/pages')
    .then(({ TutorReservation }) => ({ default: TutorReservation }))
    .catch(handleCatchChunkError)
)
