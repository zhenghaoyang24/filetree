// src/utils/highlight.ts
import hljs from 'highlight.js/lib/core';

// 按需注册语言（减小 bundle 体积）
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';       // 用于 .vue, .html, .xml
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import markdown from 'highlight.js/lib/languages/markdown';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('jsx', javascript); // jsx 用 js 高亮
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('vue', xml);        // .vue 文件用 xml 高亮（近似）
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);

// 获取语言别名映射
const LANGUAGE_MAP: Record<string, string> = {
  vue: 'vue',
  js: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  html: 'html',
  htm: 'html',
  xml: 'xml',
  json: 'json',
  css: 'css',
  scss: 'scss',
  md: 'markdown',
  markdown: 'markdown',
  yaml: 'yaml',
  yml: 'yaml',
  txt: '', // 纯文本不加高亮
};

export function getHighlightLanguage(ext: string): string | null {
  const lang = LANGUAGE_MAP[ext.toLowerCase()];
  return lang || null;
}

export function highlightCode(code: string, language: string | null): string {
  if (!language) {
    return code; // 不高亮，原样返回
  }
  try {
    return hljs.highlight(code, { language }).value;
  } catch (e) {
    console.warn('Highlighting failed for language:', language, e);
    return code;
  }
}