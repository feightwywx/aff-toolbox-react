exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
  query ToolQuery {
    allConfigJson {
      nodes {
        toolList {
          form {
            main {
              format
              helper
              id
              input
              name
            }
          }
          id
          name
        }
      }
    }
  }
    `)
    console.log(data['allConfigJson']['edges']);
  data['allConfigJson']['nodes'][0]['toolList'].forEach(tool => {
    actions.createPage({
      path: '/' + tool.id,
      component: require.resolve(`./src/components/tool.tsx`),
      context: {
        id: tool.id,
        pagePath: '/' + tool.id,
        name: tool.name,
        form: tool.form
      },
      defer: true
    })
  })
}