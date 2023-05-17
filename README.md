# Nico load cors

CORS に邪魔されずに、ニコニコ動画の HLS 取得処理を手動で行う API

# API について

## create

セッションを作成します。
sessionId を返します。

```
/create/:videoId
```

- videoId sm より始まる動画の ID

## heatbeat

セッションの維持を行います。
40 秒に一度 heatbeat されないと、セッションが放棄されます。

```
heatbeat/:sessionId
```

- sessionId /create で取得できる ID

## getHLS

セッションを元に動画の master.m3u8 を取得します。

```
/getHLS/:sessionId
```

- sessionId /create で取得できる ID
