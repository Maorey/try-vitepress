const getNav = require('./getNav')

const nav = getNav(true)
const sidebar = {}

for (let i = 0, len = nav.length, navItem; i < len; i++) {
  navItem = nav[i]

  if (!navItem.f) {
    sidebar[navItem.l] = getNav(false, '.' + navItem.l, navItem.l)
  }
}

/** @typedef {import('vitepress').UserConfig} UserConfig */

/** @type {UserConfig['head']} */
const head = [['link', { rel: 'icon', href: `/logo.jpg` }]]

/** @type {UserConfig} */
module.exports = {
  lang: 'zh-CN',
  title: '玉书',
  description: '毛瑞的博客',
  head,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '玉书',
      description: '毛瑞的博客',
    },
  },
  serviceWorker: true,
  themeConfig: {
    repo: 'Maorey/Blog',
    docsRepo: 'Maorey/Blog',
    docsDir: 'docs',
    docsBranch: 'master',

    editLinks: true,
    editLinkText: '编辑本文',
    lastUpdated: '上次更新',

    locales: {
      '/': { nav, sidebar },
    },

    isProd: process.env.NODE_ENV === 'production',

    algolia: {
      apiKey: 'c57105e511faa5558547599f120ceeba',
      indexName: 'blog',
    },
  },
  markdown: {
    lineNumbers: true,
    config: md => {
      md.use(require('markdown-it-sub'))
      md.use(require('markdown-it-sup'))
      md.use(require('markdown-it-ins'))
      md.use(require('markdown-it-abbr'))
      md.use(require('markdown-it-mark'))
      md.use(require('markdown-it-katex'))
      md.use(require('markdown-it-latex').default)
      md.use(require('markdown-it-deflist'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-link-attributes'))

      md.use(require('./markdown/markdown-it-plugin-mermaid'))
      md.use(require('./markdown/markdown-it-plugin-echarts'))
      md.use(require('./markdown/markdown-it-plugin-flowchart'))
    },
  },
}