# Lidemy 程式導師實驗計畫第四期

不喊口號也不誇大成效，開放透明的前後端線上學習計畫。

用六個月的時間，培養出一個找得到工作且基礎紮實的網頁工程師。

課綱：https://github.com/Lidemy/mentor-program-4th


![img](src/image/og-img.png)

---

## Install

```
$ npm install
```


## Usage

### ✏️ dev

```
npm run dev
```

### ✏️ production

```
npm run build
```

### optimize webfont

We defined every font-awesome class we used in `minfont.js` and get this unicode from `src/scss/font-awesome/scss/_variables.scss`. After we have unicodes, we can use [gulp-fontmin](https://www.npmjs.com/package/gulp-fontmin-woff2) to reduce the size of font file.

Be careful if you want to use new icon, you must add the class name to `minfont.js`
