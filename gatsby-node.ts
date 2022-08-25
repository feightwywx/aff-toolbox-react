import { ArcToolModule, ArcToolPageData } from './src/interface'

import type { GatsbyNode } from "gatsby"
import path from 'path'

export const createPages: GatsbyNode["createPages"] = async function ({ actions, graphql, reporter }) {
  const { data } = await graphql(`
  query ToolQuery {
    allFile (filter: { sourceInstanceName: { eq: "aff-modules" } }) {
      edges {
        node {
          relativePath
        }
      }
    }
  }
  `) as {[x: string]: any};
  data['allFile']['edges'].forEach((edge: { [x: string]: { [x: string]: any; }; }) => {
    let modulePath = edge['node']['relativePath'];
    let mod = require(path.resolve(`./src/modules/${modulePath}`)) as ArcToolModule;
    let context = {pagePath: `/${mod.id}`, ...mod} as ArcToolPageData
    actions.createPage({
      path: '/' + mod.id,
      component: path.resolve(`./src/components/tool.tsx`),
      context: context
    })
  })
}