const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
    windowMs?: number;  // Fenêtre de temps en ms (défaut: 15 min)
    maxRequests?: number;  // Nombre max de requêtes (défaut: 5)
}

export function rateLimit(
    identifier: string,
    config: RateLimitConfig = {}
): { success: boolean; remaining: number; resetIn: number } {
    const { windowMs = 15 * 60 * 1000, maxRequests = 5 } = config;
    const now = Date.now();

    const record = rateLimitMap.get(identifier);

    // Nettoyer les anciennes entrées périodiquement
    if (rateLimitMap.size > 10000) {
        for (const [key, value] of rateLimitMap.entries()) {
            if (now > value.resetTime) {
                rateLimitMap.delete(key);
            }
        }
    }

    if (!record || now > record.resetTime) {
        // Nouvelle fenêtre
        rateLimitMap.set(identifier, {
            count: 1,
            resetTime: now + windowMs
        });
        return { success: true, remaining: maxRequests - 1, resetIn: windowMs };
    }

    if (record.count >= maxRequests) {
        // Limite atteinte
        return {
            success: false,
            remaining: 0,
            resetIn: record.resetTime - now
        };
    }

    // Incrémenter le compteur
    record.count++;
    return {
        success: true,
        remaining: maxRequests - record.count,
        resetIn: record.resetTime - now
    };
}

export function getClientIP(request: Request): string {
    // Headers communs pour l'IP réelle derrière un proxy
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Fallback
    return 'unknown';
}
