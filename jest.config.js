module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'ts',
    ],

    rootDir: 'src',

    testRegex: '.*\\.spec\\.ts$',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/$1',
    },
    transform: {
        '^.+\\.(t|j)s$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/../tsconfig.spec.json',
            },
        ],
    },

    collectCoverageFrom: [
        '**/*.(t|j)s',
    ],

    coverageDirectory: '../coverage',

    testEnvironment: 'node',
};