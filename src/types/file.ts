export interface FileItem {
  name: string;
  path: string;
  children?: FileItem[];
  collapsed?: boolean;
}

// 文件信息
export interface FileInfo {
  name: string;
  type: string;           // MIME 类型，如 'text/plain'，未知时为 '未知'
  path: string;           // 文件相对路径（如 'src/App.vue'）
  size: number;           // 字节
  lastModified: string;   // 格式化后的时间字符串，如 "2025/4/5, 10:30:00"
}
