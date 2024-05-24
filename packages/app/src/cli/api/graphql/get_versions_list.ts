import {gql} from 'graphql-request'

export const AppVersionsQuery = gql`
  query AppVersionsQuery($apiKey: String!) {
    app(apiKey: $apiKey) {
      id
      organizationId
      title
      appVersions {
        nodes {
          createdAt
          createdBy {
            displayName
          }
          message
          status
          versionTag
        }
        pageInfo {
          totalResults
        }
      }
    }
  }
`

export interface AppVersionsQueryVariables {
  apiKey: string
}

export interface AppVersionsQuerySchema {
  app: {
    id: string
    organizationId: string
    title: string
    appVersions: {
      nodes: {
        createdAt: string
        createdBy?: {
          displayName?: string
        }
        message?: string
        status: string
        versionTag: string
      }[]
      pageInfo: {
        totalResults: number
      }
    }
  } | null
}
