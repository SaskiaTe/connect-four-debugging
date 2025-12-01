Fehlersuche.md

Fehler: diagonale Gewinnererkennung (falling diagonal) erkannt nicht

Vorgehen
- Reproduktionstest geschrieben (board_test.ts), der eine fallende Diagonale erzeugt.
- deno test ausgeführt → Test schlug fehl.
- Sourcecode von board.ts untersucht, Fokus auf getDiagonals.
- Ursache identifiziert: Tippfehler this.fields[i][i] in letzter Schleife. Somit wurde Spalte fälschlich mit i statt j indexiert.

Debugging-Techniken
- Statisches Durchlesen (Code-Review).
- Reproduktions-Unit-Test (TDD).
- Temporäre console.log-Ausgaben konnten benutzt werden, um die gebildeten Diagonalen zu sehen (optional).

Fix
- Ersetzt this.fields[i][i] durch this.fields[i][j].
- Zusätzliche defensive Eingabekontrollen in makeMove und winner hinzugefügt, um Abstürze bei ungültigen Indizes zu verhindern.

Ergebnis
- Test diagonal-falling-detection besteht.
- Spiel läuft interaktiv und erkennt diagonal gewonnene Züge korrekt.
