import api from './api'
import type { TokenizeRequest, TokenizeResponse, DetokenizeRequest, DetokenizeResponse, PIIDetection } from '@/types'

export const piiService = {
  async tokenize(request: TokenizeRequest): Promise<TokenizeResponse> {
    const { data } = await api.post('/pii/tokenize', request)
    return data
  },

  async detokenize(request: DetokenizeRequest): Promise<DetokenizeResponse> {
    const { data } = await api.post('/pii/detokenize', request)
    return data
  },

  async detect(text: string): Promise<{ detections: PIIDetection[] }> {
    const { data } = await api.post('/pii/detect', { text })
    return data
  },
}
