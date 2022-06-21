exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
  query ToolQuery {
    allConfigJson {
      nodes {
        toolList {
          form {
            type
            id
            format
            required
          }
          id
        }
      }
    }
  }
    `)
  // console.log(data['allConfigJson']['edges']);
  // console.log(data);
  data['allConfigJson']['nodes'][0]['toolList'].forEach(tool => {
    actions.createPage({
      path: '/' + tool.id,
      component: require.resolve(`./src/components/tool.tsx`),
      context: {
        id: tool.id,
        pagePath: '/' + tool.id,
        form: tool.form
      }
    })
  })
}