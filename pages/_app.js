import { dividerClasses } from '@mui/material'
import React from 'react'
import '../styles.css'

function BlockStarter({ Component, pageProps }) {
    return (
        
          <Component {...pageProps}/>
       );
}

export default BlockStarter; 