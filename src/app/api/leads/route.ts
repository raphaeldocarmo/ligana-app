import { createLeadHandler } from '@/lib/leads/handler'
import { isLeadStoreConfigured, saveLead } from '@/lib/leads/store'
import { createRateLimiter } from '@/lib/rate-limit'

const handleLead = createLeadHandler({
  isConfigured: isLeadStoreConfigured,
  save: saveLead,
  isAllowed: createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 }),
  log: (message) => console.error(`[leads] ${message}`),
})

export async function POST(request: Request) {
  return handleLead(request)
}
