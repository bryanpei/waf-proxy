const fs = require('fs')
const Handlebars = require("handlebars");
const TEMPLATE_FILE = `${__dirname}/template/hostname.conf`

function addNginxConf(hostname, origin, port) {
  try {
    const source = fs.readFileSync(TEMPLATE_FILE, 'utf8')
    const template = Handlebars.compile(source)
    const data = {hostname, origin, port}
    const saveFile = `/etc/nginx/conf.d/${hostname}.conf`
    const output = template(data)
    fs.writeFileSync(saveFile, output, 'utf-8')
    return 0
  } catch(e) {
    return -1
  }
}

function deleteNginxConf(hostname) {
  const filePath = `/etc/nginx/conf.d/${hostname}.conf`
  if(fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath)
      return 0
    } catch(e) {
      return -1
    }
  } else {
    return 1
  }

}

module.exports = { addNginxConf, deleteNginxConf }