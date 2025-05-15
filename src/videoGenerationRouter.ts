import express from 'express';

export const router = express.Router();

router.post('/url', async (req, res, next) => {
    const { url } = req.body;
    console.log(url)
});

module.exports = router;