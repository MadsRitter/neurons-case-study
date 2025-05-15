import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import { PassThrough } from 'stream';

export async function renderUrl(url: string): Promise<PassThrough> {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const recorder = new PuppeteerScreenRecorder(page);

  try {
    
    const pipeStream = new PassThrough();
    

    // Start video recording
    await recorder.startStream(pipeStream);

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Stop video recording
    await recorder.stop();

    return pipeStream;
  } catch (error) {
    console.error('Error rendering URL:', error);
    throw error;
  } finally {
    // Close the browser
    await browser.close();
  }
}
