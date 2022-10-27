# https://makeprompt.github.io
prompt作成用 データはすべてlocalstorageに保存しますので、入力内容はサーバー等に保管していません。

# 謝辞
このツールは<a href="https://twitter.com/gyakuse" target="_blank">逆瀬川(@gyakuse)様</a>の<a href="https://t.co/b5E6FGIFea" target="_blank">Magic Generator</a>を参考として、個人的に使用したい機能(すでに作成された呪文をいじる)をメインに無理やり実装しています。
# 使用方法
## 基本的な流れ



https://user-images.githubusercontent.com/116355282/197325340-6e35d17f-61f0-4bc0-96c1-0b4d7d4a8180.mp4


1. NovelAIから呪文をコピーしてきます
2. サイト左上のテキストボックスにペーストし「呪文からtagに追加」をクリック
<img width="523" alt="ss001" src="https://user-images.githubusercontent.com/116355282/197311138-759bbff8-7bc7-4bc2-bb6d-e2415340db8c.png">
<img width="856" alt="ss002" src="https://user-images.githubusercontent.com/116355282/197311522-4ba14528-4826-443b-9c54-048681260f2f.png">
<img width="794" alt="ss003" src="https://user-images.githubusercontent.com/116355282/197311257-7aac8010-14cc-4215-b4bf-33ca1e103c00.png">
NovelAIの重みづけまで反映して追加されます

複数の呪文を入力、「呪文からtagに追加」をクリックすると後ろに追加されます


## taglistを使う
タグを追加したい場合、サイドバーにあるtaglistをクリックすると対応したタグが呪文の最後に追加されます
初回はこちらで作成したリストを読み込みますが、以降はタグを追加したり削除したりできます(ブラウザに保存されるためサーバー側では個人設定を保存していません)
taglistの編集方法は下で説明します



https://user-images.githubusercontent.com/116355282/197314973-98ba8f14-ae88-4412-80b5-ac34d32533fc.mp4


3. 重みづけ変更や並び替えを行います
重みづけの数値を上げ下げやタグをドラッグアンドドロップで並び替えを行います


<img width="802" alt="ss004" src="https://user-images.githubusercontent.com/116355282/197311312-bc37f424-ae34-475c-a37b-182c7d22dc41.png">


4. 「Copy」をクリックし再生成された呪文をNovelAIに戻します
<img width="620" alt="ss005" src="https://user-images.githubusercontent.com/116355282/197311397-0d749899-a60d-4e88-ab28-d394bab1488d.png">


5. よさそうな呪文の保存
いい感じになったら「Promptsに追加」をクリックすると、ページ下部の作成済みPromptsに追加されます(*注意この段階では保存されていません*)
呪文の名前やUCがあれば追記して、「Promptsをキャッシュに保存」をクリックします
これでサイトをリロードしても以下のようにすぐに読み出しが可能です
<img width="786" alt="ss006_" src="https://user-images.githubusercontent.com/116355282/197313306-fae4a86e-c86f-4193-8240-68c0d2ef9098.png">
リロードした画面
<img width="949" alt="ss008" src="https://user-images.githubusercontent.com/116355282/197313960-04714e19-e18a-4ec6-9ec1-f85973fc06d2.png">


7. 保存した呪文を再度編集する
「タグ編集」をクリックすると保存した呪文を編集画面に入力し編集可能にします

UCも同様の作業が可能です

※すでにタグで表示されているものはそのまま残るため、「tag全削除」でタグを削除してからタグ編集をお勧めします

# Taglist編集
サイドバーのタグリストは初回は初期設定データを読み込みますが、次回以降は各PCに保存される個人設定（ブラウザのLocalStorage機能を使用していますのでキャッシュの削除などで設定は消えます）を読み込みます。
具体的な編集方法は以下の通りです

1.サイドバーの「Taglist編集」をクリックします
<img width="989" alt="ss010" src="https://user-images.githubusercontent.com/116355282/197315126-f8d60df0-5d6a-4f4e-9c6b-dff5ab7e3c79.png">

変種画面が別タブで開きます

<img width="989" alt="ss011" src="https://user-images.githubusercontent.com/116355282/197315182-297b540f-00d5-4726-b633-66d83fa2a16f.png">

### tagの追加
追加するtag、名称、表示するグループを入力し「tagに追加」をクリックします（*注意：この段階では保存されていません*）
「キャッシュに保存」をクリックすると現在表示されている情報でメイン画面に表示されるtaglistを更新します
<img width="989" alt="ss012_" src="https://user-images.githubusercontent.com/116355282/197315423-11fd91b1-287c-4534-b489-29e641617824.png">

### 追加済みのtagの編集
すでに追加されているtagの編集やグループ変更、並び順の変更やデータは残すが表示しない、完全な削除などが行えます
tagの編集は各項目のテキストボックスやプルダウンメニューからグループを変更してください
各グループ内の並び順はこのtaglist編集での並び順と同じです。
ドラッグアンドドロップで並び替えが可能です。
リスト表示のチェックボックスを外すとtaglistのデータには残りますが、メイン画面では表示されません。
削除の「x」ボタンを押すと項目自体を削除します。

すべての項目について自動保存とはなっていません
「キャッシュに保存」をユーザー側でクリックした際に情報を更新します
誤って削除した場合などはページを保存せずリロードで元のデータに復旧できます


#### JSONで保存
他のPCにtaglistを転送する場合やほかのユーザーに提供したい場合に使用してください
保存されるデータはその時点でページ上に表示されているデータで、キャッシュに保存されたデータではありません


#### taglistを初期値に戻す場合
taglist編集画面の「キャッシュデータ全削除」をクリックするとtaglistをすべて削除します
クリック後に再度メイン画面を更新すると、初期データを再度取り込みます
誤ってデータを編集し、修復不能となった場合などの使用を想定しています
