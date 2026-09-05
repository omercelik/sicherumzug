# Geo ownership (Phase 1)

Kurzregel für URLs und Navigation – keine Massenlöschung in diesem PR.

## Hierarchie

| Ebene | Rolle | URL-Muster | Navigation |
| --- | --- | --- | --- |
| **Bundesland (State)** | Primärer Geo-Hub | `/bundesland/{slug}/` | Bundesländer-Menü |
| **Wien-Bezirke / wenige Städte** | Lokale Ops-Seiten mit Unique Content | `/bezirke/…` bzw. District-Collection | Über State-Hub / Bezirke-Index |
| **Leistungs-Seiten mit Geo im Titel** | Kommerzielle Service-URLs; sekundär zu State-Hubs, wenn Inhalt stark überlappt | `/leistungen/umzug-{region}/` | Nur wenn Unique Intent (z. B. Umzug Wien); sonst State-Hub |

## Wien-first

- Markenkern und Ops: Wien (+ NÖ/Burgenland-Umland).
- Bundesländer-Menü: Wien zuerst, Tirol nicht als Lead in Kernleistungen.

## Bekannte Duplikate Service ↔ State

| Service-Permalink | State-Hub | Phase-1-Entscheidung |
| --- | --- | --- |
| `/leistungen/umzug-tirol/` | `/bundesland/tirol/` | **301-Redirect** auf State-Hub (klarer Duplicate). Nav verweist nur auf State. |
| `/leistungen/umzug-wien/` | `/bundesland/wien/` | **Behalten** – kommerzielle Kernseite, nicht nur Hub-Kopie. |
| `/leistungen/umzug-niederoesterreich/` u. a. Bundesland-Services | jeweiliges `/bundesland/…/` | **Seite belassen**, Nav nur State; Redirect später nach Traffic-Check. |
| `/leistungen/umzug-graz/`, `/leistungen/umzug-linz/` | Steiermark / OÖ Hubs | Stadt-Services mit eigenem Intent – belassen. |

## Redirect-Politik

- Offensichtliche 1:1-Duplikate → `_redirects` (301), Content nicht löschen in Phase 1.
- Unklar / Traffic unsicher → Seite leben lassen, Nav auf Hub, Notiz für späteren Cull.
