import express from 'express';
import { renderUrl } from './urlRendering';

export const router = express.Router();

router.post('/url', async (req, res, next) => {
    try {
        const { url } = req.body;
        const streamResponse = await renderUrl(url);
        if (!streamResponse) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        res.setHeader('Content-Type', 'video/webm');
        res.setHeader('Content-Disposition', 'attachment; filename="video.webm"');
        streamResponse.pipe(res);
        streamResponse.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        );
        streamResponse.on('finish', () => {
            console.log('Stream finished');
        }
        );
    }  catch (error) {
        next(error);
      }
    
});

module.exports = router;