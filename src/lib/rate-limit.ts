/**
 * Limite simples de envios por chave (ex.: IP) numa janela de tempo, em memória.
 * Protege contra rajadas de spam numa mesma instância. Em produção com várias
 * instâncias, complemente com o firewall da hospedagem (ver README).
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>()

  return function isAllowed(key: string, now: number = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs)
    if (recent.length >= limit) {
      hits.set(key, recent)
      return false
    }
    recent.push(now)
    hits.set(key, recent)

    // Evita crescer sem limite em instâncias de vida longa.
    if (hits.size > 5000) {
      for (const [storedKey, times] of hits) {
        if (times.every((time) => now - time >= windowMs)) hits.delete(storedKey)
      }
    }
    return true
  }
}
