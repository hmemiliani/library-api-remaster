module.exports = {
  // Indica a Jest que busque archivos de prueba con extensión .spec o .test
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  // Configura el entorno de prueba a Node
  testEnvironment: 'node',

  // Indica la transformación de archivos TypeScript para Jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // Mapeo de alias de rutas
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // Indica dónde buscar los módulos
  moduleDirectories: ['node_modules', 'src'],

  // Limpia los mocks después de cada prueba
  clearMocks: true,
};
