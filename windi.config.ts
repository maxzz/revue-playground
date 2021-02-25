import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  shortcuts: {
    btn: 'px-4 py-2 border border-solid border-gray-300 rounded hover:shadow active:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-600 text-gray-600',
  },
//   theme: {
//     extend: {
//       colors: {
//         teal: {
//           100: '#096',
//         },
//       },
//     },
//   },
})
