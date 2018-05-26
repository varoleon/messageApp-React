import React from 'react';

export const logout = ()=>{
    (localStorage.getItem('accessToken'))? localStorage.removeItem('accessToken'):null
}