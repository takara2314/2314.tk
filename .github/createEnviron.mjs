import * as fs from 'fs';
import minimist from 'minimist';
import * as changeCase from "change-case";

// 環境変数の取得と処理
const getEnvironmentVariables = () => {
  const vars = minimist(process.argv.slice(2));
  delete vars._;
  return vars;
};

// 日本時間のフォーマット
const formatJapanTime = () => {
  const japanTimeZone = 'Asia/Tokyo';
  const now = new Date().toLocaleString('en-US', { timeZone: japanTimeZone });
  const japanDate = new Date(now);

  const day = japanDate.getDate();
  const month = japanDate.toLocaleString('en-US', { month: 'short' });
  const year = japanDate.getFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const ordinalSuffix = getOrdinalSuffix(day);
  return `${day}${ordinalSuffix} ${month}, ${year}`;
};

// YAMLコンテンツの生成
const generateYamlContent = (vars) => {
  let content = 'env_variables:\n';
  Object.entries(vars).forEach(([key, value]) => {
    if (!key.startsWith('PUBLIC_')) {
      content += `  ${key}: "${value}"\n`;
    }
  });
  return content;
};

// TypeScriptコンテンツの生成
const generateTsContent = (vars) => {
  let content = `export const builtAtFormatted = '${formatJapanTime()}';\n`;
  Object.entries(vars).forEach(([key, value]) => {
    if (key.startsWith('PUBLIC_')) {
      const variableName = changeCase.camelCase(key.replace('PUBLIC_', ''));
      content += `export const ${variableName} = '${value}';\n`;
    }
  });
  return content;
};

// ファイル書き込み
const writeFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// メイン処理
const main = async () => {
  const vars = getEnvironmentVariables();
  const yamlContent = generateYamlContent(vars);
  const tsContent = generateTsContent(vars);

  try {
    await writeFile('./environ.yaml', yamlContent);
    console.log('environ.yaml is created successfully.');

    await writeFile('./src/ts/environ.ts', tsContent);
    console.log('src/ts/environ.ts is created successfully.');
  } catch (error) {
    console.error('Error writing files:', error);
  }
};

main();
