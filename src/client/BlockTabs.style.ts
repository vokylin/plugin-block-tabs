/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to https://www.nocobase.com/agreement.
 */

import { genStyleHook, useToken } from '@nocobase/client';
import { useEffect } from 'react';

export const useBlockTabsStyle = genStyleHook('nb-block-tabs', (token) => {
  // 返回空对象作为基础样式，然后通过全局样式注入
  return {};
});

// 全局样式注入 Hook，在组件中使用
export const useBlockTabsGlobalStyle = () => {
  const { token } = useToken();
  
  useEffect(() => {
    const styleId = 'nb-block-tabs-global-style';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // 使用 token 的值动态生成样式
    const paddingHorizontal = token.paddingPageHorizontal || 16;
    const paddingVertical = token.paddingPageVertical || 16;
    const bgColor = token.colorBgContainer || '#ffffff';
    
    styleElement.textContent = `
      /* 为菜单直接打开的页面中的 tabs 添加 padding，与弹出详情页保持一致 */
      .nb-page-wrapper .ant-tabs-nav {
        background: ${bgColor} !important;
        padding: 0 ${paddingHorizontal}px !important;
        margin-bottom: 0 !important;
      }
      /* 为菜单直接打开的页面中的 tabs 内容区域添加 padding，与弹出详情页保持一致 */
      .nb-page-wrapper .ant-tabs-content-holder {
        padding: ${paddingVertical}px !important;
        padding-bottom: 0px !important;
      }
    `;
  }, [token.paddingPageHorizontal, token.colorBgContainer, token.paddingPageVertical]);
};

