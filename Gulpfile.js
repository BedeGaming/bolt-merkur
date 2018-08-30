const gulp = require('gulp');
const boltTasks = require('@bedegaming/bolt-tasks');
const tasks = boltTasks.sinfonietta;
const haf = require('connect-history-api-fallback');

/**
 * Custom Tasks
 */
boltTasks.GuideTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    guide: {
      src: '/node_modules/@bedegaming/bolt/src/styleguide',
      dest: '/dist/guide'
    }
  };
};
gulp.registry(new boltTasks.GuideTasksRegistry());
gulp.registry(new boltTasks.ConfigTasksRegistry());

/**
 * Common Tasks
 */
tasks.CommonTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    clean: {
      files: ['dist']
    }
  };
};
gulp.registry(new tasks.CommonTasksRegistry());

/**
 * Script Tasks
 */
gulp.registry(new boltTasks.ScriptTasksRegistry());

/**
 * Font Tasks
 */
tasks.FontTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    fonts: {
      src: './src/resources/fonts/**/*.woff',
      dest: './dist/assets/fonts/',
      cssFilename: 'main.css'
    }
  };
};
gulp.registry(new tasks.FontTasksRegistry());

/**
 * Html Tasks
 */
tasks.HtmlTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    critical: {
      plugins: {
        critical: {
          css: ['dist/assets/index.css', 'dist/assets/skeleton/main.css']
        }
      }
    }
  };
};
gulp.registry(new boltTasks.HtmlTasksRegistry());


/**
 * Image Tasks
 */
gulp.registry(new boltTasks.ImageTasksRegistry());
gulp.registry(new boltTasks.IconTasksRegistry());
gulp.registry(new boltTasks.CompressTasksRegistry());

/**
 * Linting Tasks
 */
tasks.LintTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    lintSass: {
      ignoreFiles: [
        '!./src/styles/helpers/_sprite.scss',
        '!./src/styleguide/*.scss',
        '!./src/resources/images/svgSprites/examples/icons.scss'
      ]
    }
  };
};
gulp.registry(new tasks.LintTasksRegistry());


/**
 * Test Tasks
 */
boltTasks.IstanbulTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    src: [
      `${process.cwd()}/src/**/*.js`,
      `${process.cwd()}/main.js`
    ]
  };
};
gulp.registry(new boltTasks.IstanbulTasksRegistry());
gulp.registry(new boltTasks.MochaTasksRegistry());
gulp.registry(new boltTasks.NightwatchTasksRegistry());

/**
 * Server Tasks
 */
tasks.ServerTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    browserSync: {
      server: {
        baseDir: 'dist',
        index: '/index.html'
      },
      middleware: [haf()]
    }
  };
};
gulp.registry(new tasks.ServerTasksRegistry());

/**
 * Style Tasks
 */
gulp.registry(new boltTasks.StyleTasksRegistry());

/**
 * Watch Tasks
 */
gulp.registry(new tasks.WatchTasksRegistry());

/**
 * Sitemap Tasks
 */
boltTasks.SitemapTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    siteCode: 'mjackpots.com',
    url: 'https://www.mjackpots.com/api/v5/games?take=1000',
    hostUrl: 'https://www.mjackpots.com',
    games: [],
    pages: [
      { url: '' }
    ]
  };
};
gulp.registry(new boltTasks.SitemapTasksRegistry());

/**
 * Service Worker Tasks
 */
gulp.registry(new boltTasks.ServiceWorkerCacheRegistry());

/**
 * Caching Tasks
 */
gulp.registry(new tasks.CacheTasksRegistry());

/**
 * Content Tasks
 */
boltTasks.ContentTasksRegistry.prototype.getConfig = function getConfig() {
  return {
    settings: {
      content: {
        siteDir: 'bedecasino'
      }
    }
  };
};
gulp.registry(new boltTasks.ContentTasksRegistry());

/**
 * Build
 */
gulp.registry(new boltTasks.BuildTasksRegistry());

gulp.task('default', gulp.series('build'));
