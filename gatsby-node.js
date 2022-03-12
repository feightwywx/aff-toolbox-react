exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
  query ToolQuery {
    allConfigJson {
      edges {
        node {
          toolList {
            name
            toolPath
            form {
              main {
                id
                format
                helper
                input
                name
              }
            }
          }
        }
      }
    }
  }
    `)
    console.log(data['allConfigJson']['edges']);
  data['allConfigJson']['edges'][0]['node']['toolList'].forEach(tool => {
    actions.createPage({
      path: tool.toolPath,
      component: require.resolve(`./src/components/tool.tsx`),
      context: {
        name: tool.name,
        form: tool.form
      },
    })
  })
}