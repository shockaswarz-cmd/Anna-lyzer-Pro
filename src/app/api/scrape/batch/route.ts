import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// BATCH SCRAPING ENDPOINT
// Process multiple URLs with progress tracking and partial results
// ============================================================================

interface BatchRequest {
    urls: string[];
    stopOnError?: boolean;
}

interface ScrapeResult {
    url: string;
    success: boolean;
    data?: unknown;
    error?: string;
}

interface BatchResponse {
    success: boolean;
    total: number;
    completed: number;
    failed: number;
    results: ScrapeResult[];
}

// Internal scrape function (calls the main scrape endpoint)
async function scrapeUrl(url: string, baseUrl: string): Promise<ScrapeResult> {
    try {
        const response = await fetch(`${baseUrl}/api/scrape`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const result = await response.json();

        if (result.success) {
            return { url, success: true, data: result.data };
        } else {
            return { url, success: false, error: result.error };
        }
    } catch (error) {
        return {
            url,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

// Delay between requests to avoid rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
    const body: BatchRequest = await request.json();
    const { urls, stopOnError = false } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return NextResponse.json({
            success: false,
            error: 'URLs array is required'
        }, { status: 400 });
    }

    // Limit batch size
    const MAX_BATCH_SIZE = 10;
    if (urls.length > MAX_BATCH_SIZE) {
        return NextResponse.json({
            success: false,
            error: `Maximum batch size is ${MAX_BATCH_SIZE} URLs`
        }, { status: 400 });
    }

    // Get base URL for internal API calls
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const results: ScrapeResult[] = [];
    let completed = 0;
    let failed = 0;

    console.log(`[Batch Scraper] Starting batch of ${urls.length} URLs`);

    for (const url of urls) {
        // Delay between requests (12s = 5 per minute)
        if (results.length > 0) {
            await delay(12000);
        }

        const result = await scrapeUrl(url, baseUrl);
        results.push(result);

        if (result.success) {
            completed++;
            console.log(`[Batch Scraper] ✓ ${completed}/${urls.length}: ${url}`);
        } else {
            failed++;
            console.log(`[Batch Scraper] ✗ ${url}: ${result.error}`);

            if (stopOnError) {
                break;
            }
        }
    }

    const response: BatchResponse = {
        success: failed === 0,
        total: urls.length,
        completed,
        failed,
        results
    };

    console.log(`[Batch Scraper] Complete: ${completed}/${urls.length} successful`);

    return NextResponse.json(response);
}

// GET endpoint for status/health check
export async function GET() {
    return NextResponse.json({
        endpoint: '/api/scrape/batch',
        method: 'POST',
        description: 'Batch scrape multiple property URLs',
        maxBatchSize: 10,
        delayBetweenRequests: '12 seconds',
        body: {
            urls: ['array of property URLs'],
            stopOnError: 'optional, default false'
        }
    });
}
