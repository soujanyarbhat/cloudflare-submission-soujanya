addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 Responds with a variant and stores the URL as a cookie
 * @param {Request} request
 */
async function handleRequest(request) {

  url = getCookie(request, "URL")
 
  if(url==null){

   //fetching URLs from specified api
    let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  
    //parsing the json response and storing URLs in urls variable
    let data = await response.json()
    urls = data.variants
    
    //generating random index to choose the site to make request from
    rindex = Math.floor(
    Math.random() * (urls.length)
    )
    url = urls[rindex]
  }

  //fetching response from selected url (random if no cookie set) and returning the response
  let urlresponse = await fetch(url)
  urlresponse = new Response(urlresponse.body, urlresponse);

  urlresponse.headers.append('Set-Cookie', "URL="+url);

  //modifying the response content
  const rewriter = new HTMLRewriter()
  .on('title', new AttributeRewriter("title"))
  .on('h1#title', new AttributeRewriter("h1#title"))
  .on('p#description', new AttributeRewriter("p#description"))
  .on('a#url', new AttributeRewriter("a#url"))
  
  return rewriter.transform(urlresponse)
}

function getCookie(request, name) {
  let result = null
  let cookieString = request.headers.get('Cookie')
  if (cookieString) {
    let cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      let cookieName = cookie.split('=')[0].trim()
      if (cookieName === name) {
        let cookieVal = cookie.split('=')[1]
        result = cookieVal
      }
    })
  }
  return result
}

class AttributeRewriter {
  constructor(elementName) {
    this.elementName = elementName
  }

  element(element) {
    switch (this.elementName) {
      case "title": element.setInnerContent("Soujanya's Submission")
	break;
      case "h1#title": element.prepend("Submission")
	break;
      case "p#description": element.setInnerContent("You can only see this variant now. Delete cookies/restart the browser and try again for an other random variant")
	break;
      case "a#url": element.setAttribute("href","https://www.linkedin.com/in/soujanya-r-bhat/" )
        element.setInnerContent("Link To Soujanya's LinkedIn")
	break;
    }
  }
}
