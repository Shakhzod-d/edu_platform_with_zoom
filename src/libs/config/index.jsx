const appStage = import.meta.env.VITE_APP_STAGE || 'prod'

const stages = {
  dev: {
    apiUrl: 'http://single.uz/api',
    cdnHost: 'https://single.uz/uploads',
  },
  prod: {
    apiUrl: 'https://api.edu-platform.uz',
    cdnHost: 'http://api.edu-platform.uz/uploads',
  },
}

export const stage = stages[appStage]
