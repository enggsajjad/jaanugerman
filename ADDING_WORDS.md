# Neue Wörter zum Wörterbuch hinzufügen

Öffnen Sie `assets/vocabulary-data.js` und ergänzen Sie vor dem letzten `];` einen neuen Eintrag.

```javascript
{
  "level": "B2",
  "topic": "Politik und Gesellschaft",
  "word": "abschaffen",
  "translation": "to abolish",
  "germanExample": "Die Regierung möchte die Todesstrafe endgültig abschaffen.",
  "exampleTranslation": "The government wants to abolish the death penalty once and for all.",
  "type": "Verben",
  "grammar": "+ Akkusativ",
  "combinations": [
    "eine Regelung abschaffen",
    "das Gesetz abschaffen",
    "die Todesstrafe abschaffen"
  ],
  "conjugation": "Präsens: schafft ab · Präteritum: schaffte ab · Perfekt: hat abgeschafft"
},
```

## Pflichtfelder
`level`, `topic`, `word`, `translation`.

## Empfohlene Felder
- `germanExample`: deutscher Beispielsatz
- `exampleTranslation`: englische Übersetzung des Satzes
- `type`: `Nomen`, `Verben`, `Adjektive`, `Adverbien`, `Wendungen` oder `Andere`
- `grammar`: z. B. `+ Akkusativ`, `sich + Dativ`, `mit + Dativ`
- `combinations`: wichtige Nomen-Verb-Verbindungen, Kollokationen oder typische Kombinationen als Liste
- `conjugation`: wichtige Verbformen oder Deklinationshinweise

Nach dem Speichern erscheint das Wort automatisch in Suche, Filtern und Vokabeltest.
