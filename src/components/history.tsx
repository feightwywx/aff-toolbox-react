import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';
import { HistoryItemData } from '../interface';

export const HistoryContext = React.createContext({});

export function HistoryDialogContent({value, ...props }: {value: Array<HistoryItemData>, [x: string]: any}) {

  return (
    <>
      <Dialog open={dialogOpen}>
        <DialogTitle>
          历史记录
          <IconButton
            onClick={() => {setDialogOpen(false)}}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Dialog>
    </>
  )
}