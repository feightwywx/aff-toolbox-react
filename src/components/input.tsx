import { Trans, useTranslation } from "react-i18next";

import React from 'react';
import { TextField } from "@mui/material";
import { useField } from "formik";

export const AffTextField = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation();

  let isError = Boolean(meta.touched && meta.error)

  return (
    <TextField {...field} {...props}
      multiline
      fullWidth
      rows={10}
      label={t(props.name)}
      helperText={isError ? t(meta.error!) : t('支持完整AFF或谱面片段')}
      error={isError}
      placeholder={`AudioOffset:248\n-\ntiming(0,222.22,4.00);\n...`}
    />
  )
}

export const NumberField = ({ ...props }) => {
  const [field, meta] = useField(props as { name: any });
  const { t } = useTranslation();

  let isError = Boolean(meta.touched && meta.error)

  return (
    <TextField {...field} {...props}
      fullWidth
      label={t(props.name)}
      helperText={isError ? t(meta.error!) : null}
      error={isError}
    />
  )
}
