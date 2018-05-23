export default preval`
  const fs = require('fs');
  const bulma = fs.readFileSync(
    require('path').join(require.resolve('bulma'), '..', 'css', 'bulma.min.css'), 'utf8'
  )
  module.exports = bulma
`
