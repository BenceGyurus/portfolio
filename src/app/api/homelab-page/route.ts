import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PAGE_URL = "https://status.gyurus.hu/api/status-page/homelab";
const TIMEOUT_MS = 10000;

let lastGoodData: unknown = null;

export async function GET() {
  try {
    const res = await fetch(PAGE_URL, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "User-Agent": "Portfolio-Telemetry-Proxy/1.0",
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      if (lastGoodData) {
        return NextResponse.json(lastGoodData, {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
            "Access-Control-Allow-Origin": "*",
            "X-Telemetry-Source": "stale-cache",
          },
        });
      }
      return NextResponse.json(
        { ok: false, error: `Upstream status service returned ${res.status}` },
        { status: 502, headers: { "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" } }
      );
    }

    const data = await res.json();
    lastGoodData = data;
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    if (lastGoodData) {
      return NextResponse.json(lastGoodData, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Access-Control-Allow-Origin": "*",
          "X-Telemetry-Source": "stale-cache",
        },
      });
    }
    return NextResponse.json(
      { ok: false, error: "Status service unreachable or timed out", details: String(err) },
      { status: 502, headers: { "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" } }
    );
  }
}
