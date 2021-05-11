module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  timers: 'fake',
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/simulating/**/*.js',
  ],
  coverageReporters: ['html', 'lcov', 'text'],
}
