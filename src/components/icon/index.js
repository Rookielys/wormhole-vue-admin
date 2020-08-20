let iconLoader = require.context('../../assets/icon', false, /.*\.svg$/);
iconLoader.keys().forEach(item => {
    iconLoader(item);
});

// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('../../assets/icon', false, /\.svg$/)
// requireAll(req)