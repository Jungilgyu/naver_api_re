const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 네이버 API 인증 정보
const clientId = 'cdGnnsDtcBloMfx2lmru';
const clientSecret = 'QXDrtxS0Jj';

app.use(express.json());
app.use(express.static('public'));

// 검색 엔드포인트
app.post('/search', async (req, res) => {
    const { query } = req.body;
    const apiUrl = 'https://openapi.naver.com/v1/search/shop.json';

    try {
        const apiResponse = await axios.get(apiUrl, {
            params: { query },
            headers: {
                'X-Naver-Client-Id': clientId,
                'X-Naver-Client-Secret': clientSecret
            }
        });
        // API 응답을 클라이언트로 전송
        res.json(apiResponse.data);
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
