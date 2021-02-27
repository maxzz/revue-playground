import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  darkMode: 'class',
  shortcuts: {
    btn: 'px-4 py-2 border border-solid border-gray-300 rounded text-gray-600 hover:text-blue-600 hover:shadow active:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-600',
  },
  theme: {
      cursor: {
          'col-resize': 'col-resize',
          'row-resize': 'row-resize',
      }
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
