using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EjemploRazorPages.Pages
{
    public class MultiplicarModel : PageModel
    {
        [BindProperty]
        public int Numero1 { get; set; }
        [BindProperty]
        public int Numero2 { get; set; }
        [BindProperty]
        public int? Resultado { get; set; }

        public void OnGet()
        {

        }
        public void OnPost() 
        {
            Resultado = Numero1 * Numero2;
        }  
    }
}
