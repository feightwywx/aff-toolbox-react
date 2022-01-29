module.exports = {
  siteMetadata: {
    title: `AFF Toolbox`,
    siteUrl: `https://aff.arcaea.icu`,
    affToolBox: {
      toolList: [
        {
          name: '谱面偏移工具',
          type: 'chart',
          path: '/chart-offset',
          new: false,
        },
        {
          name: '谱面镜像工具',
          type: 'chart',
          path: '/chart-mirror',
          new: false,
        },
        {
          name: '谱面对齐工具',
          type: 'chart',
          path: '/chart-align',
          new: false,
        },
        {
          name: '切蛇工具',
          type: 'arc',
          path: '/arc-cutter',
        },
        {
          name: '时间点切蛇工具',
          type: 'arc',
          path: '/arc-splitbytiming',
          new: false,
        },
        {
          name: '下雨Arc生成',
          type: 'arc',
          path: '/arc-rain',
          new: false,
        },
        {
          name: '折线Arc生成',
          type: 'arc',
          path: '/arc-crease-line',
          new: false,
        },
        {
          name: '帧动画辅助',
          type: 'arc',
          path: '/arc-animate',
          new: false,
        },
        {
          name: 'Arc包络',
          type: 'arc',
          path: '/arc-envelope',
          new: true,
        },
        {
          name: 'Timing缓动',
          type: 'timing',
          path: '/timing-easing',
          new: true,
        },
        {
          name: '抽动Timing',
          type: 'timing',
          path: '/timing-glitch',
          new: false
        },
        {
          name: '卡顿Timing',
          type: 'timing',
          path: '/timing/stuck',
          new: true
        }
      ]
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    'gatsby-theme-material-ui',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.tsx`),
      },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/config/`,
      },
    },
  ],
}