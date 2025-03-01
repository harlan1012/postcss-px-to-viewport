import type { Options } from './types'
import { plugin } from './postcssPlugin'

const postcssPlugin = (opts: Partial<Options>) => plugin(opts)
export default postcssPlugin
