import React from "react"
import { graphql } from "gatsby"

export default function toolPage( { data } ) {
    console.log(data);
    const pageContext = data['allSitePage']['nodes'][0]['pageContext']
    const pageName = pageContext['name']
    const pageForm = pageContext['form']
    return null;
}

export const pageQuery = graphql`
query ToolPageQuery($path: String!) {
    allSitePage(filter: {path: {eq: $path}}) {
      nodes {
        pageContext
      }
    }
  }
`
