using System.Web;
using System.Web.Mvc;

namespace Angularjs2MVC_Event
{
	public class FilterConfig
	{
		public static void RegisterGlobalFilters(GlobalFilterCollection filters)
		{
			filters.Add(new HandleErrorAttribute());
		}
	}
}
