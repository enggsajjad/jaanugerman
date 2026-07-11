# Neue Wörter zum Wörterbuch hinzufügen

Das zentrale Wörterbuch liest alle Einträge aus:

`assets/vocabulary-data.js`

## 1. Datei öffnen

Öffnen Sie `assets/vocabulary-data.js` in GitHub und klicken Sie auf das Stiftsymbol **Edit this file**.

## 2. Neuen Eintrag einfügen

Jedes Wort ist ein JavaScript-Objekt innerhalb von `window.VOCABULARY_DATA = [ ... ];`.
Fügen Sie vor der abschließenden eckigen Klammer `];` einen neuen Eintrag ein.

```javascript
{
  "level": "B2",
  "topic": "Arbeit und Beruf",
  "word": "die Bewerbung",
  "translation": "job application",
  "example": "Ich schicke meine Bewerbung heute ab. I am sending my job application today.",
  "type": "Nomen"
},
```

## 3. Erlaubte Niveaus

Verwenden Sie genau einen dieser Werte:

- `A1`
- `A2`
- `B1`
- `B2`
- `BSK_B2`
- `C1`
- `C2`

Dadurch erscheint das Wort automatisch im richtigen Niveau-Filter.

## 4. Erlaubte Wortarten

Das Feld `type` ist optional. Empfohlen sind:

- `Nomen`
- `Verben`
- `Adjektive`
- `Adverbien`
- `Wendungen`
- `Andere`

Ohne `type` versucht die Website, die Wortart automatisch zu erkennen. Für zuverlässige Filter sollte sie ausdrücklich angegeben werden.

## 5. Wichtige Kommaregel

Zwischen zwei Einträgen muss ein Komma stehen. Nach dem letzten Eintrag darf ebenfalls ein Komma stehen.

```javascript
{
  "level": "A1",
  "topic": "Familie",
  "word": "der Onkel",
  "translation": "uncle",
  "example": "Mein Onkel wohnt in Berlin. My uncle lives in Berlin.",
  "type": "Nomen"
},
{
  "level": "A2",
  "topic": "Reisen",
  "word": "umbuchen",
  "translation": "to rebook",
  "example": "Ich muss meinen Flug umbuchen. I need to rebook my flight.",
  "type": "Verben"
},
```

## 6. Speichern und veröffentlichen

1. Klicken Sie auf **Commit changes**.
2. Warten Sie kurz auf die GitHub-Pages-Bereitstellung.
3. Öffnen Sie `dictionary.html` neu oder drücken Sie `Ctrl + F5`.

Das neue Wort erscheint automatisch in der Suche, im Niveau- und Wortartfilter sowie in den 20-/30-Wörter-Tests.

## Optional: Wörter zunächst auf der jeweiligen Niveau-Seite ergänzen

Die einzelnen Seiten wie `B2/01_Wortschatz.html` haben eigene Tabellen. Diese werden nicht automatisch aus der zentralen Wörterbuchdatei erzeugt. Möchten Sie ein Wort sowohl dort als auch im Gesamtwörterbuch sehen, ergänzen Sie es an beiden Stellen:

1. in `assets/vocabulary-data.js` für das Wörterbuch und die Tests;
2. in der entsprechenden Datei, zum Beispiel `B2/01_Wortschatz.html`, für die B2-Lektionsseite.
