import { dividerClasses } from '@mui/material'
import React from 'react'

function BlockStarter({ Component, pageProps }) {
    return (
        <div 
        // style={{
        //     "backgroundColor": "#121212",
        //     "width": "100%",
        //     "height": "100%"
        //     }}
            >
          <Component {...pageProps}/>
        </div>
       );
}

export default BlockStarter; 