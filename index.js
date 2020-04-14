addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  //fetching URLs from specified api
  let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  
  //parsing the json response and storing URLs in urls variable
  let data = await response.json()
  urls = data.variants
  console.log(urls)

  //generating random index to choose the site to make request from
  rindex = Math.floor(
    Math.random() * (urls.length)
  )

  //fetching response from randomly selected url and returning the response
  return await fetch(urls[rindex])
}
