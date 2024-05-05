import React from 'react';
import { httpClient } from '../utils/httpClient';

const userPanelService = (data) => {
    return httpClient.get("/GetProfile", data)
}

export default userPanelService;
