using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Angularjs2MVC_Event.DBContext;

namespace Angularjs2MVC_Event.Controllers
{
    public class EventAPIController : BaseController
    {
		public HttpResponseMessage Get()
		{
			return ToJson(EventDB.Events.AsEnumerable());
		}

		public HttpResponseMessage Post([FromBody]Event value)
		{
			EventDB.Events.Add(value);             
			return ToJson(EventDB.SaveChanges());
		}

		public HttpResponseMessage Put(int id, [FromBody]Event value)
		{
			EventDB.Entry(value).State = EntityState.Modified;
			return ToJson(EventDB.SaveChanges());
		}
		public HttpResponseMessage Delete(int id)
		{
			EventDB.Events.Remove(EventDB.Events.FirstOrDefault(x => x.Id == id));
			return ToJson(EventDB.SaveChanges());
		}
		
    }
}
