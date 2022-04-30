import { CircularProgress } from '@mui/material'
import React from 'react'

export const LoadingComponent = () => {
  return (
    <div className='loading-component'>
        <CircularProgress size="4rem" color="secondary" />
    </div>
  )
}
