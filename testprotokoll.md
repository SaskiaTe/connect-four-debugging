Testprotokoll.md

1) Programmabsturz: ungültige Eingaben
Bedingung: Leere Eingabe (Enter) oder nicht-numerische Eingabe (foo) beim Prompt Player x:
Beobachtung: Das Spiel wirft eine Exception (Zugriffsfehler), z.B. Zugriff auf this.fields[-1] oder ähnliche Fehlermeldung.  
Reproduktionsschritte: Starten mit deno run --reload main.ts, bei Prompt Player x: direkt Enter drücken.  
Auswirkung: Spielabsturz.

2) Spiellogik: diagonale Gewinnererkennung (falling diagonal) fehlerhaft
Bedingung / Spielbrett: Baue mit legalen Zügen folgende Position auf (Koordinaten (row,col)):
- X bei (5,0)
- X bei (4,1)
- X bei (3,2)
- X bei (2,3)

Reproduktionsschritte (Beispiel mit makeMove-Aufrufen in Tests oder manuell):
- Setze Steine in Spalte 0, dann Spalte 1 zweimal, Spalte 2 dreimal, Spalte 3 viermal (Stapeln).
Erwartet: Spieler X gewinnt (4-in-a-row diagonal).  
Tatsächlich: Ohne Fix wird kein Gewinner erkannt.

