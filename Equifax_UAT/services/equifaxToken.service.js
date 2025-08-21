const { AppDataSource } = require("../../ApiCobrador/api/config/database");
const EquifaxToken = require('../../ApiCobrador/api/EquifaxToken/model');
const axios = require('axios');
const qs = require('qs');

/**
 * Get or refresh Equifax OAuth token
 */
async function getEquifaxToken() {
    try {
        const now = new Date();
        const tokenRepo = AppDataSource.getRepository(EquifaxToken);

        const existingToken = await tokenRepo.findOne({
            where: {},
            order: { created_at: 'DESC' }
        });

        if (existingToken && new Date(existingToken.expires_at) > now) {
            return {
                status: 'success',
                access_token: existingToken.access_token,
                token_type: existingToken.token_type,
                expires_at: existingToken.expires_at,
                source: 'cache'
            };
        }

        if (existingToken) {
            await tokenRepo.remove(existingToken);
        }

        const data = qs.stringify({
            grant_type: 'client_credentials',
            scope: 'https://api.latam.equifax.com/business/interconnect/v1/decision-orchestrations'
        });

        const response = await axios.post(
            'https://api.uat.latam.equifax.com/v2/oauth/token',
            data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic <TU_CLIENT_SECRET_ENCODED>'
                }
            }
        );

        const tokenData = response.data;
        const issuedAtMillis = tokenData.issued_at || Date.now();
        const adjustedExpiresIn = tokenData.expires_in - 3600; // 1h antes
        const expiresAt = new Date(issuedAtMillis + adjustedExpiresIn * 1000);

        const newToken = tokenRepo.create({
            access_token: tokenData.access_token,
            token_type: tokenData.token_type,
            expires_in: tokenData.expires_in,
            issued_at: issuedAtMillis,
            expires_at: expiresAt
        });

        await tokenRepo.save(newToken);

        return {
            status: 'success',
            access_token: newToken.access_token,
            token_type: newToken.token_type,
            expires_in: newToken.expires_in,
            source: 'new'
        };

    } catch (error) {
        console.error("Error al obtener el token:", error?.response?.data || error.message);
        return {
            status: 'error',
            message: 'Error al obtener el token de Equifax',
            data: null
        };
    }
}

module.exports = { getEquifaxToken };
