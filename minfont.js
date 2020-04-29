// grep -Ri "fa-*" ./src/scss
const fs = require('fs')
const fas = `
fa-volume-up
fa-thumbs-up
fa-globe-americas
fa-database
fa-tools
fa-server
fa-chart-line
fa-shield-alt
fa-code-branch
fa-chalkboard-teacher
fa-eye
fa-bars
fa-external-link-alt
fa-chevron-up
fa-check
fa-user-circle
fa-arrow-right
fa-arrow-down
fa-arrow-up
fa-calendar-alt
fa-stream
fa-check-square
fa-arrow-alt-circle-right
fa-copy
fa-long-arrow-alt-right
`.split('\n').filter(n => n)

const fab = `
fa-github
fa-facebook-square
fa-medium
fa-react
fa-js
fa-html5
fa-css3-alt
fa-chrome
fa-php
`.split('\n').filter(n => n)

const cssContent = fs.readFileSync('./src/scss/font-awesome/scss/_variables.scss', 'utf8')
function getUnicode(classNames) {
  let unicodes = []
  let names = classNames.map(name => {
    return name.replace('fa-', 'fa-var-')
  })
  for(let name of names) {
    let result = cssContent.match(new RegExp(`${name}: (.*);`))
    if (result && result[1]) {
      console.log(name, result[1])
      unicodes.push(result[1].replace('\\', '\\u'))
    } else {
      throw new Error('Not found: ' + name)
    }
  }
  return unicodes
}

let fasCodes = getUnicode(fas)
let fabCodes = getUnicode(fab)

console.log('fas:')
console.log(fasCodes.join(''))
console.log('fab:')
console.log(fabCodes.join(''))
console.log('all:(copy this string to gulpfile.js)')
console.log(fasCodes.join('') + fabCodes.join(''))
