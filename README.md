# 🧑🏻 2314.tk
僕の人生初のポートフォリオサイトです。
何かのワールドに入ったかのようなデザインにしてみました。
3Dゲームを作っているみたいで、楽しかったです！

https://2314.world/

(2314.tk ドメインが使えなくなったため、 2314.world に変更)

## 🕸 システム構成図
![SystemConfig](https://github.com/takara2314/2314.tk/blob/main/SystemConfig.svg)

## 📚 使用技術
|               | 言語                  | ライブラリ (フレームワーク)                        |
| ------------- | --------------------- | -----------------------------------------------  |
| フロントエンド | TypeScript, CSS, HTML | React, Three.js(react-three-fiber), Tailwind CSS |
| バックエンド   | Go                    | Gin                                              |

## 💻 インフラ
Google App Engine

## 📦 フロントエンドのビルド手順
### 1. 依存関係をインストール
```sh
npm install
```

### 2. 環境変数ファイルを作成
```sh
node .github/createEnviron.mjs \
  --SENDMAIL_TOKEN *** \
  --FROM_EMAIL *** \
  --FROM_SMTP *** \
  --FROM_SMTP_PORT *** \
  --FROM_PASSWORD *** \
  --TO_EMAIL *** \
  --PUBLIC_SENDMAIL_TOKEN ***
```

### 3. ビルド
```sh
npm run build
```

## ✏ 補足
https://2314.world/skills

の像の3Dモデルは、真ん中上のアイコン以外すべてBlenderでモデリングしました。

![Blender モデリング様子](https://i.gyazo.com/2f2bf2bf97b684723019a14922b5770a.png)
