import * as fs from 'fs';
import minimist from 'minimist';
import * as changeCase from "change-case";

// 環境変数をコマンドラインから取得
const vars = minimist(process.argv.slice(2));
delete vars._;

// environ.yaml に書き込む内容を作成
let yamlContent = 'env_variables:\n';

// src/ts/environ.ts に書き込む内容を作成
let tsContent = '';

// 各変数を処理
for (const key of Object.keys(vars)) {
  if (key.startsWith('PUBLIC_')) {
    const variableName = changeCase.camelCase(
      key.replace('PUBLIC_', '')
    );
    tsContent += `export const ${variableName} = '${vars[key]}';\n`;
  } else {
    yamlContent += `  ${key}: "${vars[key]}"\n`;
  }
}

// environ.yaml ファイルを作成
fs.writeFile('./environ.yaml', yamlContent, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('environ.yaml is created successfully.');
  }
});

// src/ts/environ.ts ファイルを作成
fs.writeFile('./src/ts/environ.ts', tsContent, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('src/ts/environ.ts is created successfully.');
  }
});
