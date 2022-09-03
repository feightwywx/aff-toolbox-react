import * as ac from './src/utils'

import { ArcToolCategory, ArcToolModule, ArcToolPageData } from './src/interface'

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
  
  const affModuleEdges = data['allFile']['edges'];

  ac.nodeLog(`正在载入模块`);
  affModuleEdges.forEach((edge: { [x: string]: { [x: string]: any; }; }, index: number) => {
    const modulePath = edge['node']['relativePath'];
    const mod = require(path.resolve(`./src/modules/${modulePath}`)) as ArcToolModule;
    ac.nodeLog(`[${++index}/${affModuleEdges.length}] ${mod.type}/${mod.id}`);
    const context = {pagePath: `/${mod.id}`, ...mod} as ArcToolPageData
    actions.createPage({
      path: '/' + mod.id,
      component: path.resolve(`./src/components/tool.tsx`),
      context: context
    })
  })
}