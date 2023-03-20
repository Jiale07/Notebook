const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg/matters', false, /\.svg$/)
requireAll(req)
