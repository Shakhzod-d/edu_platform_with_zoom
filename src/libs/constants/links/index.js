function getItem(key, label) {
  return {
    key,
    label,
  }
}

const userLinks = [getItem('Find a teacher', 'student'), getItem('Courses', 'courses')]

const studentLinks = [
  getItem('Dashboard', 'student/dashboard'),
  getItem('Tutors', 'student/tutors'),
  getItem('Courses', 'student/courses'),
]

const studentDashLinks = [
  getItem('Upcoming', 'upcoming'),
  getItem('Live', 'live'),
  getItem('Need schedule', 'schedule'),
  getItem('Completed', 'completed'),
]

const tutorLinks = [
  getItem('Dashboard', 'tutor/dashboard'),
  getItem('Priority hours', 'tutor/priority'),
  getItem('Reservations', 'tutor/reservations'),
  getItem('Library', 'tutor/library'),
  getItem('History', 'tutor/history'),
]

const tutorDashLinks = [
  getItem('Incoming', 'incoming'),
  getItem('Unassigned', 'unassigned'),
  getItem('Upcoming', 'upcoming'),
]

export { userLinks, tutorLinks, studentLinks, tutorDashLinks, studentDashLinks }
