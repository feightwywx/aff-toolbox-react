import * as Yup from 'yup'

import { AffTextField, NumberField } from "./input";

import { FieldData } from "../interface";
import { Grid } from '@mui/material';
import React from "react";

export function fieldParser(field: FieldData) {
    if (field.type === 'aff') {
      return (
        <Grid key={field.id} item xs={12}>
          <AffTextField
            name={field.id}
            id={field.id}
            type='text'
          />
        </Grid>
      )
    } else if (field.type === 'number') {
      return (
        <Grid key={field.id} item xs={12} sm={6} md={4}>
          <NumberField
            name={field.id}
            id={field.id}
            type='text'
          />
        </Grid>
      )
    } else {
      console.warn(`[AFF Toolbox] 表单生成工具未生成以下控件：不支持${field.type}类型\n控件声明：\n${JSON.stringify(field, null, 2)}`);
    }
  }

export function validationParser(field: FieldData) {
  let validationSchema = {[field.id]: undefined} as {[x: string]: any}
  
  if (field.type === 'number') {
    validationSchema[field.id] = Yup.number().typeError('请输入一个数值')
    if (field.format && 'int' in field.format) {
      validationSchema[field.id] = validationSchema[field.id].integer('值不能为小数');
    }

    if (field.format && 'nonNegative' in field.format) {
      validationSchema[field.id] = validationSchema[field.id].min(0, '值不能为负数');
    }

  } else if (field.type === 'aff') {
    validationSchema[field.id] = Yup.string()
  } else {
    console.warn(`[AFF Toolbox] 表单生成工具未生成以下验证：不支持${field.type}类型\n控件声明：\n${JSON.stringify(field, null, 2)}`);
  }

  if (field.required) {
    validationSchema[field.id] = validationSchema[field.id].required('不能为空');
  }

  return validationSchema[field.id];
}