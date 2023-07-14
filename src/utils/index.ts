import { parse } from 'yaml';
const path = require('path');
const fs = require('fs');

export const getConfig = () => {
  console.log(process.cwd())
  // 此处可根据环境读取不同的配置文件
  const yamlPath = path.join(process.cwd(), `./src/config/.dev.yaml`); 
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  console.log(config)
  return config;
};

