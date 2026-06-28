# Deutsch Lernraum — GitHub Pages starter

A static German-learning website inspired by a level-based A1–C2 course structure. It uses only HTML, CSS and JavaScript.

## Included
- Responsive A1–C2 landing page
- A1 course overview
- Searchable/filterable A1 vocabulary page
- German browser text-to-speech
- Color-coded der/die/das
- Dark mode
- No frameworks, database or build step

## Publish on GitHub Pages
1. Create a new GitHub repository, for example `deutsch-lernraum`.
2. Upload all files and folders from this package to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then save.
6. GitHub will show the public address after deployment.

## Local preview
Open `index.html` directly, or run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Add Urdu
Add a fourth column to the vocabulary table, e.g. `<th>Urdu</th>`, and add an Urdu `<td>` to each row. UTF-8 is already enabled.

## Suggested next steps
- Move vocabulary into JSON and generate tables dynamically.
- Add A2–C2 folders using the A1 structure.
- Add quizzes and progress tracking with localStorage.
- Add custom audio files where browser speech is insufficient.


## B2-Berufskurs (BSK_B2)

The project now includes a dedicated `BSK_B2/` section with two interactive vocabulary tests:

- Gleichstellung & Arbeitswelt (11 terms)
- Kommunikation am Arbeitsplatz (13 terms)

Open `BSK_B2/index.html` to access both tests.


## A2 complete
The A2 folder contains nine linked modules: vocabulary, grammar, sentences, reading, listening, speaking, writing, model exam, and telc exam format.


## Complete CEFR structure
A1, A2, B1, B2, C1 and C2 each contain nine linked modules. The BSK_B2 section and its vocabulary tests are preserved.
