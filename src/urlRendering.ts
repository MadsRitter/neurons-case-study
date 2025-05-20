import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import { PassThrough } from 'stream';
import {setTimeout} from "node:timers/promises";

export async function renderUrl(url: string): Promise<PassThrough> {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  
  const recorder = new PuppeteerScreenRecorder(page);

  try {
    
    const pipeStream = new PassThrough();
    
    await recorder.startStream(pipeStream);

    await page.goto(url, { waitUntil: 'networkidle2' });

    await setTimeout(3000);

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
