import React from 'react'

export function getScore(score, flag = false){
    let result = {}
    let text = ''
    switch(score){
        case 0:
            text = "Butuh Perhatian"
            if(flag){
                result = {
                    text: text,
                    color: 'border-left-red',
                }
            } else {
                return text
            }
        break;
        case 1:
            text = "Baik"
            if(flag){
                result = {
                    text: text,
                    color: 'border-left-yellow',
                }
            } else {
                return text
            }
        break;
        case 2:
            text = "Sangat Baik"
            if(flag){
                result = {
                    text: text,
                    color: 'border-left-green',
                }
            } else {
                return text
            }
        break;
    }
    return result
}