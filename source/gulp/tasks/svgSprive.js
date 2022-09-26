import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
  return app.gulp.src(app.path.src.svgicons, { sourcemaps: true })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(svgSprive({
      mode: {
        stack: {
          sprite: `../icons/icons.svg`,
          // Создавать страницу с перечнем иконок
          example: true
        }
      },
    })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`));
}