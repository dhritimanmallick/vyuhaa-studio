; Vyuhaa Video Studio - Custom NSIS Installer Script
; Adds Vyuhaa branding to the Windows installer

!define PRODUCT_NAME "Vyuhaa Video Studio"
!define PRODUCT_PUBLISHER "Vyuhaa Med Data Private Limited"
!define PRODUCT_WEB_SITE "https://www.vyuhaadata.com"

; Welcome page text
!define MUI_WELCOMEPAGE_TITLE "Welcome to Vyuhaa Video Studio"
!define MUI_WELCOMEPAGE_TEXT "Vyuhaa Video Studio is a professional video editor for medical researchers and medtech teams.$\r$\n$\r$\nCreate high-quality videos for research demos, prototype walkthroughs, clinical presentations, and more — with captions, timeline editing, and GPU-accelerated export.$\r$\n$\r$\nClick Next to continue."

; Finish page
!define MUI_FINISHPAGE_TITLE "Vyuhaa Video Studio Installed"
!define MUI_FINISHPAGE_TEXT "Vyuhaa Video Studio has been installed successfully.$\r$\n$\r$\nVisit www.vyuhaadata.com to learn more about our AI-powered diagnostic tools."
!define MUI_FINISHPAGE_RUN_TEXT "Launch Vyuhaa Video Studio"
!define MUI_FINISHPAGE_LINK "Visit Vyuhaa Med Data website"
!define MUI_FINISHPAGE_LINK_LOCATION "https://www.vyuhaadata.com"
