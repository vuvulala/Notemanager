# Oversikt :page_facing_up:
Dette er et program for visning / printing av noter
Støtter følgende filtyper på noter
- PDF


# Bruk :gear:
Programmet fungerer ved å lete gjennom filer på `/config/**/*.json`
En config fil har følgende struktur

```json
{
  "name": "Navn på sang",
  "category": "hva/som/helst",
  "parts": {
    "instrument_1": {
      "stemme_1": {
        "path": "sti/til/note.pdf",
        "pages": [1]
      },
      "stemme_2": {
        "path": "sti/til/note.pdf",
        "pages": [2]
      }
    },
    "instrument_2": {
      "stemme_1": {
        "path": "sti/til/note/stemme_1.pdf",
        "pages": [1]
      },
      "stemme_2": {
        "path": "sti/til/note/stemme_2.pdf",
        "pages": [1]
      }
    }
  }
}
```
Dette eksempelet vil da lage en sang som heter `Navn på sang`
denne sangen vil bli plassert i følgende mappe:
```
hva
+-som
| +-helst
| | +-<sangnavn>
```
**mapper blir automatisk laget basert på kategorier**

# Hvordan kjøre lokalt :computer:
Alt tekst skrevet `sånn` skal kjøres i terminal (cmd, powershell, etc.)
1. Gå til en mappe der du vil ha prosjektet, *prosjektet blir lagt i en undermappe*
2. Kopier prosjektet inn i en ny mappe
  `git clone https://www.github.com/vuvulala/Notemanager`
3. Gå inn i den lagde mappen der prosjektet ligger
  `cd Notemanager`
4.  Installer nødvendige programmer prosjektet bruker
  `npm install`
5. Kjør prosjektet i utviklingsmodus
  `npm run dev`