export default {
  title: 'OSS ЯAR',
  dest: '../../_docs',
  base: process.env.ENV === 'local' ? '/' : '/common',
  typescript: true,
  menu: ['Readme', 'Getting Started', 'Packages', 'Changelog', 'License'],
  themeConfig: {
    fonts: {
      body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      heading: '"Avenir Next", sans-serif',
      monospace: 'Menlo, monospace'
    },
    colors: {
      text: '#000',
      background: '#fff',
      primary: '#1fb6ff',
      secondary: '#5352ed',
      cancel: '#ff4949',
      dark: '#273444',
      gray: '#8492a6'
    },
    alert: {
      info: {
        bg: '#5352ed',
        color: '#fff'
      },
      positive: {
        bg: '#2ed573',
        color: '#fff'
      },
      negative: {
        bg: '#ff4757',
        color: '#fff'
      },
      warning: {
        bg: '#ffa502',
        color: '#fff'
      }
    }
  }
}
