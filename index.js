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
  let urlresponse = await fetch(urls[rindex])

  //modifying the response content
  const rewriter = new HTMLRewriter()
  .on('title', new AttributeRewriter("title"))
  .on('h1#title', new AttributeRewriter("h1#title"))
  .on('p#description', new AttributeRewriter("p#description"))
  .on('a#url', new AttributeRewriter("a#url"))
  
  return rewriter.transform(urlresponse)
}

class AttributeRewriter {
  constructor(elementName) {
    this.elementName = elementName
  }

  element(element) {
    switch (this.elementName) {
      case "title": element.setInnerContent("Soujanya's Submission")
	break;
      case "h1#title": console.log(element) 
        element.prepend("Submission")
	break;
      case "p#description": element.prepend("Modified Description by Soujanya:")
	break;
      case "a#url": element.setAttribute("href","https://www.linkedin.com/in/soujanya-r-bhat/" )
        element.setInnerContent("Link To Soujanya's LinkedIn")
	break;
    }
  }
}
