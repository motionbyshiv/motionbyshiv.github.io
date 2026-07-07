/* ================================================================
   SITE CONFIG — single source of truth for contact details, brand
   name, and Supabase credentials. Edit here; every page updates.
   ================================================================ */
window.SITE = {
  brand: "Motion By Shiv",
  domain: "https://motionbyshiv.github.io",

  founder: "Shiv Sharma",

  /* WhatsApp is the primary conversion channel */
  whatsappNumber: "919805780708", // international format, no "+"
  whatsappMessage: "Hi — I found your studio through the website. I'd like to talk about a project.",

  email: "saisharma250@gmail.com",

  /* ---- Email delivery (FormSubmit.co — free, no signup) ----
     Wizard briefs + contact-form inquiries are emailed to the
     address below via FormSubmit's AJAX endpoint.
     ONE-TIME ACTIVATION: the first submission from the live site
     triggers a confirmation email to that inbox — click the
     "Activate" link in it once, and every submission after that
     is delivered normally.                                       */
  formEndpoint: "https://formsubmit.co/ajax/saisharma250@gmail.com",

  /* ---- Supabase (optional — leave url empty to disable) ----
     When filled in, the contact form posts to the `inquiries`
     table and the newsletter form to `subscribers`.
     See supabase-setup.sql for the schema + RLS policies.       */
  supabase: {
    url: "",      // e.g. "https://xyzcompany.supabase.co"
    anonKey: ""   // the public anon key (safe to expose client-side)
  }
};

window.SITE.whatsappLink =
  "https://wa.me/" + window.SITE.whatsappNumber +
  "?text=" + encodeURIComponent(window.SITE.whatsappMessage);
window.SITE.emailLink = "mailto:" + window.SITE.email;
