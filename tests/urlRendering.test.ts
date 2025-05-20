import { renderUrl } from '../src/urlRendering';
import puppeteer from 'puppeteer';
import { PassThrough } from 'stream';

jest.mock('puppeteer');
jest.mock('puppeteer-screen-recorder', () => ({
  PuppeteerScreenRecorder: jest.fn().mockImplementation(() => ({
    startStream: jest.fn().mockImplementation((stream) => stream),
    stop: jest.fn(),
  })),
}));

describe('renderUrl', () => {
  let browser;
  let page;
  let recorder;

  beforeEach(() => {
    page = {
      goto: jest.fn(),
    };
    browser = {
      newPage: jest.fn().mockResolvedValue(page),
      close: jest.fn(),
    };
    recorder = {
      startStream: jest.fn().mockImplementation((stream) => stream),
      stop: jest.fn(),
    };

    (puppeteer.launch as jest.Mock).mockResolvedValue(browser);
    
    // Reset the mock implementation for PuppeteerScreenRecorder
    const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
    PuppeteerScreenRecorder.mockImplementation(() => recorder);
  });

  it('should load the headless browser and return a stream', async () => {
    const url = 'https://example.com';
    const stream = await renderUrl(url);

    expect(puppeteer.launch).toHaveBeenCalled();
    expect(browser.newPage).toHaveBeenCalled();
    expect(page.goto).toHaveBeenCalledWith(url, { waitUntil: 'networkidle2' });
    expect(recorder.startStream).toHaveBeenCalledWith(expect.any(PassThrough));
    expect(recorder.stop).toHaveBeenCalled();
    expect(browser.close).toHaveBeenCalled();
    expect(stream).toBeInstanceOf(PassThrough);
  });

  it('should handle errors gracefully', async () => {
    const url = 'https://example.com';
    const error = new Error('Test error');

    page.goto.mockRejectedValueOnce(error);

    await expect(renderUrl(url)).rejects.toThrow('Test error');
    expect(browser.close).toHaveBeenCalled();
  });
});
