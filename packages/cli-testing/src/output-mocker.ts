import {output} from '@shopify/cli-kit'
import {vi} from 'vitest'

interface OutputMock {
  output: () => string
  info: () => string
  debug: () => string
  success: () => string
  warn: () => string
  clear: () => void
}

export function mockAndCapture() {
  const collectedOutput: string[] = []
  const collectedInfo: string[] = []
  const collectedDebug: string[] = []
  const collectedSuccess: string[] = []
  const collectedWarn: string[] = []

  const infoSpy = vi.spyOn(output, 'info').mockImplementation((content) => {
    collectedOutput.push(output.stringifyMessage(content))
    collectedInfo.push(output.stringifyMessage(content))
  })
  const debugSpy = vi.spyOn(output, 'debug').mockImplementation((content) => {
    collectedOutput.push(output.stringifyMessage(content))
    collectedDebug.push(output.stringifyMessage(content))
  })
  const successspy = vi.spyOn(output, 'success').mockImplementation((content) => {
    collectedOutput.push(output.stringifyMessage(content))
    collectedSuccess.push(output.stringifyMessage(content))
  })
  const outputSpy = vi.spyOn(output, 'warn').mockImplementation((content) => {
    collectedOutput.push(output.stringifyMessage(content))
    collectedWarn.push(output.stringifyMessage(content))
  })
  return {
    output: () => collectedOutput.join('\n'),
    info: () => collectedInfo.join('\n'),
    debug: () => collectedDebug.join('\n'),
    success: () => collectedSuccess.join('\n'),
    warn: () => collectedWarn.join('\n'),
    clear: () => {
      infoSpy.mockClear()
      debugSpy.mockClear()
      successspy.mockClear()
      outputSpy.mockClear()
    },
  }
}
