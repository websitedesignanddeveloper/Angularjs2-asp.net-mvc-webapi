using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Angularjs2MVC_Event.DBContext;
using Newtonsoft.Json;
using System.Text;

namespace Angularjs2MVC_Event.Controllers
{
    public class BaseController : ApiController
    {
		protected readonly DemoEntities EventDB = new DemoEntities();
    protected HttpResponseMessage ToJson(dynamic obj)
    {
      var response = Request.CreateResponse(HttpStatusCode.OK);
      response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
      return response;
    }
    }
}
