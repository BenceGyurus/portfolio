import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const HEARTBEAT_URL = "https://status.gyurus.hu/api/status-page/heartbeat/homelab";
const TIMEOUT_MS = 3000;
const CIRCUIT_BREAKER_COOLDOWN_MS = 30000;

let lastFailure = 0;
let lastGoodData: unknown = null;

export async function GET() {
  const now = Date.now();
  // Circuit breaker: If upstream failed recently, return cached data if available or 503
  if (now - lastFailure < CIRCUIT_BREAKER_COOLDOWN_MS) {
    if (lastGoodData) {
      return NextResponse.json(lastGoodData, {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=45",
          "X-Telemetry-Source": "stale-cache",
        },
      });
    }
    return NextResponse.json(
      { ok: false, error: "Status service circuit open (cooldown)" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  try {
    const res = await fetch(HEARTBEAT_URL, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "User-Agent": "Portfolio-Telemetry-Proxy/1.0",
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      lastFailure = Date.now();
      if (lastGoodData) {
        return NextResponse.json(lastGoodData, {
          headers: {
            "Cache-Control": "public, s-maxage=15, stale-while-revalidate=45",
            "X-Telemetry-Source": "stale-cache",
          },
        });
      }
      return NextResponse.json(
        { ok: false, error: `Upstream status service returned ${res.status}` },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    const data = await res.json();
    lastGoodData = data;
    lastFailure = 0;
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=45",
      },
    });
  } catch {
    lastFailure = Date.now();
    if (lastGoodData) {
      return NextResponse.json(lastGoodData, {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=45",
          "X-Telemetry-Source": "stale-cache",
        },
      });
    }
    return NextResponse.json(
      { ok: false, error: "Status service unreachable or timed out" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
