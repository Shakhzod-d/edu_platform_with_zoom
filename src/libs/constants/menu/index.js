function getItem(label, key) {
  return {
    key,
    label,
  }
}

const userItems = [
  getItem('English - USD $', ''),
  getItem('Find a teacher', '/tutors'),
  getItem('Courses', '/cources'),
  getItem('Become a teacher', '/tutor'),
  getItem('Log In', '/sign-in'),
  getItem('Sign Up', '/sign-up'),
]

const teacherItems = [
  getItem('Asosiy', '/panel'),
  getItem('Fan resurslari', '/panel/subject'),
  getItem('Amaliyotlar', '/panel/subject/practices'),
  getItem('Labaratoriyalar', '/panel/subject/laboratories'),
]

export { userItems }
