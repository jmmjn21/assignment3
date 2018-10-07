
const myEnvs = {};

myEnvs.dev = {
  templateGlobals: {
    appName: 'chacker',
    companyName: 'Mansilla S.L.',
    yearCreated: '1986',
    baseUrl: 'http://localhost:3000/'
  }
}

myEnvs.pro = {
  templateGlobals: {
    appName: 'chacker',
    companyName: 'Mansilla S.L.',
    yearCreated: '1986',
    baseUrl: 'http://localhost:5000/'
  }
}

const environment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''
const currentEnv = typeof(myEnvs[environment]) === 'object' ? myEnvs[environment] : myEnvs['dev']

module.exports = currentEnv
