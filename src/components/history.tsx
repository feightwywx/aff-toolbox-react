import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Stack, Card, CardContent, CardActions, Tooltip, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import React from 'react';
import { HistoryItemData } from '../interface';

import { v4 as uuidv4 } from 'uuid';
import { useI18next } from 'gatsby-plugin-react-i18next';

export const HistoryContext = React.createContext({
  history: [] as Array<HistoryItemData>,
  setHistory: (value: Array<HistoryItemData>) => { }
});

export function HistoryDialogContent({ value, ...props }: { value: Array<HistoryItemData>, [x: string]: any }) {
  const [copiedTooltip, setCopiedTooltip] = React.useState(false);
  const { t } = useI18next() 

  return (
    <DialogContent sx={{ minHeight: '70vh', display: 'flex', flexFlow: 'column' }}>
      {value.length === 0 ?
        <>
          <Box sx={{ display: 'flex', flexGrow: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <HistoryToggleOffIcon sx={{ fontSize: 100, color: (theme) => theme.palette.text.secondary }} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
              variant='h6'
              sx={{ color: (theme) => theme.palette.text.secondary }}>
              还没有生成过谱面片段
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1 }} />
        </>
        :
        <>
          <Stack spacing={2}>
            {value.map((x: HistoryItemData) => {
              return (
                <Card key={uuidv4()}>
                  <CardContent>
                    <Typography component='pre' style={{ fontFamily: 'inherit', margin: '0 0 0 0', whiteSpace: 'pre-wrap' }}>
                        {x.value.length > 500 ? `${x.value.substring(0, 500)}...` : x.value}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography variant='subtitle2' sx={{ ml: 1, color: (theme) => theme.palette.text.secondary }}>
                      {t(`${x.tool}.name`)} - {new Date(x.time).toLocaleString()}
                    </Typography>
                    <Tooltip title={copiedTooltip ? '已复制' : '复制'} placement='top'>
                      <IconButton
                        sx={{ ml: 'auto' }}
                        onClick={() => {
                          if (navigator.clipboard !== undefined) {
                            navigator.clipboard.writeText(x.value);
                            setCopiedTooltip(true);
                          } else {
                            console.warn('[AFF Toolbox] 无法访问剪贴板，这可能是因为权限不足，浏览器过旧或页面不来自一个安全的来源。')
                          }
                        }}
                        onMouseLeave={() => {
                          setTimeout(() => {
                            setCopiedTooltip(false);
                          }, 500)

                        }}>
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              )
            })}
          </Stack>
        </>}
    </DialogContent>
  )
}