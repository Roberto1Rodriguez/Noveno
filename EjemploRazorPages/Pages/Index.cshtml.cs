using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.Cryptography.X509Certificates;

namespace EjemploRazorPages.Pages
{
    public class IndexModel : PageModel
    {
        public List<string> Tabla { get; set; }=new List<string>();
        public void OnGet(int tabla)
        {
            for (int i = 0; i <= 10; i++)
            {
                string o = $"{tabla}x{i}={tabla*i}";
                Tabla.Add(o);
            }
        }
    }
}
