import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src/native/index.ts',
      outDir: './dist',
    },
    {
      input: './src/react/index.ts',
      outDir: './dist/react',
    },
    {
      input: './src/vue/index.ts',
      outDir: './dist/vue',
    },
  ],
  declaration: 'compatible',
  externals: ['react', 'vue'],
})
