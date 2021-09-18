module.exports = async function (context, req) {

  try {
      context.log('JavaScript HTTP trigger function processed a request.')

      // Read incoming data
      const name = req.query.name || (req.body && req.body.name)
      const sport = req.query.sport || (req.body && req.body.sport)

      // fail if incoming data is required
      if (!name || !sport) {
          context.res = {
              status: 400
          }
          return
      }

      if (name) {
          context.bindings.outputDocument = JSON.stringify({
              // create a random ID
              id: new Date().toISOString() + Math.random().toString().substr(2,8),
              name: name
          })
      }

      // Add or change code here
      const message = `${name} likes ${sport}`

      // Construct response
      const responseJSON = {
          "name": name,
          "sport": sport,
          "message": message,
          "success": true
      }

      context.res = {
          // status: 200, /* Defaults to 200 */
          body: responseJSON,
          contentType: 'application/json'
      }
  } catch(err) {
      context.res = {
          status: 500
      }
  }
}
