module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    // Use packageFilter to process parsed `package.json` before the resolution (see Modules folder).
    packageFilter: (pkg) => {
      // This is a workaround for https://github.com/facebook/jest/issues/9771
      // Sometime around Jest 25, resolving packages that export via `exports`
      // stopped working as expected.
      if (pkg.exports) {
        delete pkg.exports;
      }
      return pkg;
    },
  });
};
