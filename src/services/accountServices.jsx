import React from "react";
import { httpClient } from "../utils/httpClient";

export const register = (data) => {
    return httpClient.post('/account/register', data)
}