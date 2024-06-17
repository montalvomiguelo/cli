import {BaseProcess, DevProcessFunction} from './types.js'
import {pollAppLogsForDev} from '../../app-logs/poll-app-logs-for-dev.js'
import {DeveloperPlatformClient} from '../../../utilities/developer-platform-client.js'
import {AppLogsSubscribeVariables} from '../../../api/graphql/subscribe_to_app_logs.js'
import {subscribeToAppLogs} from '../../app-logs/helpers.js'

import {createLogsDir} from '@shopify/cli-kit/node/logs'

interface SubscribeAndStartPollingOptions {
  developerPlatformClient: DeveloperPlatformClient
  appLogsSubscribeVariables: AppLogsSubscribeVariables
}

export interface AppLogsSubscribeProcess extends BaseProcess<SubscribeAndStartPollingOptions> {
  type: 'app-logs-subscribe'
}

interface Props {
  developerPlatformClient: DeveloperPlatformClient
  subscription: {
    shopIds: string[]
    apiKey: string
  }
}

export async function setupAppLogsPollingProcess({
  developerPlatformClient,
  subscription: {shopIds, apiKey},
}: Props): Promise<AppLogsSubscribeProcess> {
  const {token} = await developerPlatformClient.session()

  return {
    type: 'app-logs-subscribe',
    prefix: 'app-logs',
    function: subscribeAndStartPolling,
    options: {
      developerPlatformClient,
      appLogsSubscribeVariables: {
        shopIds,
        apiKey,
        token,
      },
    },
  }
}

export const subscribeAndStartPolling: DevProcessFunction<SubscribeAndStartPollingOptions> = async (
  {stdout, stderr, abortSignal},
  {developerPlatformClient, appLogsSubscribeVariables},
) => {
  try {
    const jwtToken = await subscribeToAppLogs(developerPlatformClient, appLogsSubscribeVariables)

    const apiKey = appLogsSubscribeVariables.apiKey
    await createLogsDir(apiKey)

    await pollAppLogsForDev({
      stdout,
      appLogsFetchInput: {jwtToken},
      apiKey,
      resubscribeCallback: () => {
        return subscribeAndStartPolling(
          {stdout, stderr, abortSignal},
          {developerPlatformClient, appLogsSubscribeVariables},
        )
      },
    })
    // eslint-disable-next-line no-catch-all/no-catch-all,no-empty
  } catch (error) {}
}
