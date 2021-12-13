global.$ = {
  gulp: require("gulp"),
  gp: require("gulp-load-plugins")(),
  bs: require("browser-sync").create(),
  path: {
    serverDir: "./app/dist",
    src: {
      html: "./app/src/*.{html,pug}",
      css: "./app/src/scss/*.scss",
      script: "./app/src/scripts/*.ts",
      font: "./app/src/fonts/**/*.ttf",
      img: "./app/src/images/**/*.{jpg,png,tiff,webp,jpeg}",
    },
    dist: {
      html: "./app/dist/",
      css: "./app/dist/styles/",
      script: "./app/dist/scripts/",
      font: "./app/dist/fonts/",
      img: "./app/dist/images/",
    },
    watch: {
      html: ["./app/src/*.{html,pug}", "./app/src/components/*.{html,pug}"],
      css: "./app/src/scss/**/*.scss",
      script: "./app/src/scripts/*.ts",
      font: "./app/src/fonts/**/*.ttf",
      img: "./app/src/images/**/*.{jpg,png,tiff,webp,jpeg}",
    },
  },
};

require("./gulp/config").forEach((task) => require(task)());

$.gulp.series(
  $.gulp.parallel("html", "css", "script", "font", "img", "server", "watch")
)();
